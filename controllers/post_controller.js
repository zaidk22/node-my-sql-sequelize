const models = require('../models');

function save(req, res) {


    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: req.userData.userId 
    }
    models.Category.findByPk(req.body.categoryId);
    models.Post.create(post).then(result => {
        res.status(201).json({
            message: "Post created",
            post: result
        });
    }).catch(err => {
        res.status(500).json({
            message: "error ",
            error: err
        });


    });
}

async function show(req, res) {
    const id = req.params.id;

    const result = await models.Post.findByPk(id);
    if (result) {
        res.status(200).json({
            message: "success",
            post: result
        });
    }
    else {
        res.status(404).json({
            message: "records not found",

        });
    }
}



async function index(req, res) {
  
    const page = req.query.page || 1; // Default to page 1 if not specified
    const perPage = req.query.perPage||10; // Adjust the number of items per page as needed

    try {
        const offset = (page - 1) * perPage;
        const result = await models.Post.findAndCountAll({
            where: { userId :req.userData.userId}, 
            offset: offset,
            limit: +perPage,

        });

        res.status(200).json({
            message: "success",
            post: result.rows, // Use result.rows to get the actual data
            totalItems: result.count,
            perPage: +perPage // Use result.count to get the total count
        });
    } catch (e) {
        res.status(500).json({
            message: "error",
            error: e,
        });
    }
}





async function update(req, res) {
    const postId = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: 1
    }
    const userId = 1;
    try {
        await models.Post.update(updatedPost, { where: { id: postId, userId: userId } });
        res.status(200).json({
            message: "updated",
            post: updatedPost
        });
    }
    catch (e) {
        res.status(500).json({
            message: "error ",
            error: e
        });
    }
}

async function deletePost(req, res) {
    const postId = req.params.id;

    const userId = 1;
    try {
        await models.Post.destroy({ where: { id: postId, userId: userId } });
        res.status(200).json({
            message: "deleted",

        });
    }
    catch (e) {
        res.status(500).json({
            message: "error ",
            error: e
        });
    }
}

module.exports = {
    save,
    show,
    index,
    update,
    deletePost
}