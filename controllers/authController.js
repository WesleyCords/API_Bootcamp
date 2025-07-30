import authService from "../services/authService.js"

const register = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;
    const { newUser, token } = await authService.register(nome, email, senha);
    res.status(201).json({
      status: "sucesso",
      token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const { user, token } = await authService.login(email, senha);
    res.status(200).json({
      status: "sucesso",
      token,
      data: {
        user
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login
}
