"use strict";
const Kriteria = use("App/Models/Kriteria");
const BandingKriteria = use("App/Models/BandingKriteria");
const { validate } = use("Validator");
const Ahp = use("App/Models/Ahp");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with kriterias
 */
class KriteriaController {
  async tes({ request, response }) {
    const kriteria = await BandingKriteria.query()
      .with("kriteriaA")
      .fetch();
    return response.send(kriteria);
  }
  async showFormPembobotan({ request, response, view }) {
    const kriterias = await Kriteria.all();
    return view.render("pages.kriteria.form-pembobotan")
    // return view.render("pages.kriteria.pembobotan", {
    //   kriterias: kriterias.toJSON()
    // });
  }

  async pembobotan({request, response}){
    const ahp_kriteriaUtama = new Ahp();
    ahp_kriteriaUtama.tambahKriteria(request.input("kriteria"));
    ahp_kriteriaUtama.hitungKriteria(request.input("matriksPerbandingan"));
    const hasil_K = ahp_kriteriaUtama.run();
    console.log(hasil_K)
    return hasil_K
  }

  async simpanPembobotan({request, response}){
    const ahp_kriteriaUtama = new Ahp();
    ahp_kriteriaUtama.tambahKriteria(request.input("kriteria"));
    ahp_kriteriaUtama.hitungKriteria(request.input("matriksPerbandingan"));
    const hasil_K = ahp_kriteriaUtama.run();
    console.log(hasil_K)
    return hasil_K
  }
  /**
   * Show a list of all kriterias.
   * GET kriterias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const page = request.get().page > 0 ? request.get().page : 1;
    const perPage = 10;

    const kriterias = await Kriteria.query().paginate(page, perPage);
    return response.send(kriterias);
    // return view.render("pages.kriteria.index", {
    //   kriterias: kriterias.toJSON()
    // });
  }

  /**
   * Render a form to be used for creating a new kriteria.
   * GET kriterias/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new kriteria.
   * POST kriterias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    // validation
    const rules = {
      nama: "required",
      kode: "required|unique:kriteria,kode"
    };
    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response.status(422).json({
        notification: {
          type: "danger",
          messages: validation.messages()
        }
      });
    }

    const kriteria = await Kriteria.create({
      nama: request.input("nama"),
      kode: request.input("kode")
    });
    return response.json({
      message: "Kriteria added",
      kriteria
    });
  }

  /**
   * Display a single kriteria.
   * GET kriterias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing kriteria.
   * GET kriterias/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const kriteria = await Kriteria.find(params.id);
    if (!kriteria) {
      return response.status(404).json({
        message: "Kriteria not found",
        id: params.id
      });
    }
    return response.send(kriteria);
  }

  /**
   * Update kriteria details.
   * PUT or PATCH kriterias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const kriteria = await Kriteria.find(params.id);
    if (!kriteria) {
      return response.status(404).json({
        message: "Kriteria not found",
        id: params.id
      });
    }
    // validation
    const rules = {
      nama: "required|unique:kriteria,nama"
    };
    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response.status(422).json({
        notification: {
          type: "danger",
          messages: validation.messages()
        }
      });
    }

    kriteria.nama = request.input("nama");
    await kriteria.save();
    return response.status(200).json({
      message: "Kriteria updated",
      id: params.id
    });
  }

  /**
   * Delete a kriteria with id.
   * DELETE kriterias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const kriteria = await Kriteria.find(params.id);
    if (!kriteria) {
      return response.status(404).json({
        message: "Kriteria not found",
        id: params.id
      });
    }
    await kriteria.delete();

    return response.json({
      message: "Kriteria deleted",
      id: params.id
    });
  }
}

module.exports = KriteriaController;
