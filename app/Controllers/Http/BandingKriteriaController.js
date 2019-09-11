"use strict";
const BandingKriteria = use("App/Models/BandingKriteria");
const { validate } = use("Validator");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bandingKriterias
 */
class BandingKriteriaController {
  
  /**
   * Show a list of all bandingKriterias.
   * GET bandingKriterias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const page = request.get().page > 0 ? request.get().page : 1;
    const perPage = 10;

    const bandingKriterias = await BandingKriteria.query().with("kBanding").with("kPembanding").paginate(page, perPage);
    return response.send(bandingKriterias)
    // return view.render("pages.bandingKriteria.index", {
    //   bandingKriterias: bandingKriterias.toJSON()
    // });
  }

  /**
   * Render a form to be used for creating a new bandingKriteria.
   * GET bandingKriterias/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new bandingKriteria.
   * POST bandingKriterias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    
    // validation
    const rules = {
      user_id: "required",
      k_banding: "required",
      k_pembanding: "required",
      nilai: "required|number"
    };
    const validation = await validate(request.all(), rules);
    if(validation.fails()){
      return response.status(422).json({
        notification:{
          type: "danger",
          messages: validation.messages()
        }
      })
    }

    const bandingKriteria = await BandingKriteria.create({
      user_id: request.input('user_id'),
      k_banding: request.input('k_banding'),
      k_pembanding: request.input('k_pembanding'),
      nilai: request.input('nilai')
    });
    return response.json({
      message: "BandingKriteria added",
      bandingKriteria
    });
  }

  /**
   * Display a single bandingKriteria.
   * GET bandingKriterias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing bandingKriteria.
   * GET bandingKriterias/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const bandingKriteria = await BandingKriteria.find(params.id);
    if (!bandingKriteria) {
      return response.status(404).json({
        message: "BandingKriteria not found",
        id: params.id
      });
    }
    return response.send(bandingKriteria);
  }

  /**
   * Update bandingKriteria details.
   * PUT or PATCH bandingKriterias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  
    const bandingKriteria = await BandingKriteria.find(params.id);
    if (!bandingKriteria) {
      return response.status(404).json({
        message: "BandingKriteria not found",
        id: params.id
      });
    }
    // validation
    const rules = {
      username: "required|unique:bandingKriteria,username",
    };
    const validation = await validate(request.all(), rules);
    if(validation.fails()){
      return response.status(422).json({
        notification:{
          type: "danger",
          messages: validation.messages()
        }
      })
    }

    bandingKriteria.username = request.input("username");
    await bandingKriteria.save();
    return response.status(200).json({
      message: "BandingKriteria updated",
      id: params.id
    });
  }

  /**
   * Delete a bandingKriteria with id.
   * DELETE bandingKriterias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const bandingKriteria = await BandingKriteria.find(params.id);
    if (!bandingKriteria) {
      return response.status(404).json({
        message: "BandingKriteria not found",
        id: params.id
      });
    }
    await bandingKriteria.delete();

    return response.json({
      message: "BandingKriteria deleted",
      id: params.id
    });
  }
}

module.exports = BandingKriteriaController;
