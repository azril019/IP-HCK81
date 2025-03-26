const { User, Preference } = require("../models");
const axios = require("axios");
const { GoogleGenAI } = require("@google/genai");

class Controller {
  static async getProfile(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id, {
        attributes: ["id", "email", "name"],
      });

      if (!user) {
        return next({ status: 404, message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.log("🚀 ~ Controller ~ getProfile ~ error", error);
      next(error);
    }
  }

  static async editProfile(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id);
      await user.update(req.body);

      if (!user) {
        next(res.status(404).json({ message: "User not found" }));
        return;
      }

      res.status(200).json({ message: "Profile updated", user });
    } catch (error) {
      console.log("🚀 ~ Controller ~ editProfile ~ error:", error);
      next(error);
    }
  }

  static async deleteProfile(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.destroy({
        where: { id },
      });

      if (!user) {
        next(res.status(404).json({ message: "User not found" }));
        return;
      }

      res.status(200).json({ message: "Profile deleted", user });
    } catch (error) {
      console.log("🚀 ~ Controller ~ deleteProfile ~ error:", error);
      next(error);
    }
  }

  static async addPreference(req, res, next) {
    try {
      const { id } = req.user;
      const preference = await Preference.create({
        ...req.body,
        userId: id,
      });

      res.status(201).json(preference);
    } catch (error) {
      console.log("🚀 ~ Controller ~ addPreference ~ error:", error);
      next(error);
    }
  }

  static async getPreference(req, res, next) {
    try {
      const { id } = req.user;
      const preference = await Preference.findAll({ where: { userId: id } });

      res.status(200).json(preference);
    } catch (error) {
      console.log("🚀 ~ Controller ~ getPreference ~ error:", error);
      next(error);
    }
  }

  static async editPreference(req, res, next) {
    try {
      const { id } = req.params;
      const preference = await Preference.findByPk(id);

      if (!preference) {
        next(res.status(404).json({ message: "Preference not found" }));
        return;
      }

      await preference.update(req.body);

      res.status(200).json(preference);
    } catch (error) {
      console.log("🚀 ~ Controller ~ editPreference ~ error:", error);
      next(error);
    }
  }

  static async deletePreference(req, res, next) {
    try {
      const { id } = req.params;
      const preference = await Preference.destroy({
        where: { id },
      });

      if (!preference) {
        next(res.status(404).json({ message: "Preference not found" }));
        return;
      }

      res.status(200).json({ message: "Preference deleted" });
    } catch (error) {
      console.log("🚀 ~ Controller ~ deletePreference ~ error:", error);
      next(error);
    }
  }

  static async getDetail(req, res, next) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Preference,
            as: "Preference",
            attributes: { exclude: ["userId"] },
          },
        ],
      });

      if (!user) {
        next(res.status(404).json({ message: "User not found" }));
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.log("🚀 ~ Controller ~ getProfile ~ error", error);
      next(error);
    }
  }

  static async getExternalData(req, res, next) {
    try {
      const { id } = req.user;
      const page = +req.params.id;

      const preference = await Preference.findAll({ where: { userId: id } });
      const job = preference.map((preferences) => preferences.job);

      const apiUrl = `https://api.scrapingdog.com/linkedinjobs?api_key=67e15d91aa2395acfbb705b5&field=${job}&geoid=102478259&page=${page}`;

      const response = await axios.get(apiUrl);

      res.status(200).json(response.data);
    } catch (error) {
      console.log("🚀 ~ Controller ~ getExternalData ~ error:", error);
      next(error);
    }
  }
  static async getRecommendationFromAi(req, res, next) {
    try {
      const { id } = req.user;
      const preferences = await Preference.findAll({ where: { userId: id } });
      const job = preferences.map((preference) => preference.job);

      const apiUrl = `https://api.scrapingdog.com/linkedinjobs?api_key=67e15d91aa2395acfbb705b5&field=${job}&geoid=102478259&page=1&sortBy=&jobType=&expLevel=&workType=&filterByCompany=`;

      const apiResponse = await axios.get(apiUrl);

      const jobLink = apiResponse.data.map((job) => job.job_link);

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Berikan saya rekomendasi pekerjaan dari link berikut ${jobLink} yang sesuai dengan kualifikasi saya berdasarkan data berikut ${JSON.stringify(
          preferences
        )}`,
      });

      res.status(200).json(response.text);
    } catch (error) {
      console.log("🚀 ~ Controller ~ getExternalData ~ error:", error);
      next(error);
    }
  }
  static async choiceJob(req, res, next) {
    try {
      const { id } = req.user;
      const { job } = req.body;

      const preference = await Preference.create({
        userId: id,
        job,
      });

      res.status(201).json(preference);
    } catch (error) {
      console.log("🚀 ~ Controller ~ choiceJob ~ error:", error);
      next(error);
    }
  }
}

module.exports = Controller;
