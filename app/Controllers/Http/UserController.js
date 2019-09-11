"use strict";
const User = use("App/Models/User");
const { validate } = use("Validator");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const page = request.get().page > 0 ? request.get().page : 1;
    const perPage = 10;

    const users = await User.query().paginate(page, perPage);
    return response.send(users)
    // return view.render("pages.user.index", {
    //   users: users.toJSON()
    // });
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    
    // validation
    const rules = {
      username: "required|unique:users,username",
      email: "required|email|unique:users,email",
      password: "required|min:8"
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

    const user = await User.create({
      username: request.input('username'),
      email: request.input('email'),
      password: request.input('password')
    });
    return response.json({
      message: "User added",
      user
    });
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        id: params.id
      });
    }
    return response.send(user);
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  
    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        id: params.id
      });
    }
    // validation
    const rules = {
      username: "required|unique:user,username",
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

    user.username = request.input("username");
    await user.save();
    return response.status(200).json({
      message: "User updated",
      id: params.id
    });
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        id: params.id
      });
    }
    await user.delete();

    return response.json({
      message: "User deleted",
      id: params.id
    });
  }
}

module.exports = UserController;
