module.exports.formulario = function (app, req, res) {
    res.render("admin/form_add_noticia", { validacao: {}, noticia: {} })

}

module.exports.noticias_salvar = function (app, req, res) {
    var noticia = req.body

    req.assert('titulo', 'Titulo é Obrigatorio').notEmpty();
    req.assert('resumo', 'Resumo é Obrigatorio').notEmpty();
    req.assert('resumo', 'Resumo deve contem entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor', 'Autor é Obrigatorio').notEmpty();
    req.assert('data_noticia', 'Data é Obrigatorio').notEmpty().isDate({ format: 'YYYY-MM-DD' });
    req.assert('noticia', 'Noticia é Obrigatorio').notEmpty();

    var erros = req.validationErrors();


    if (erros) {
        res.render("admin/form_add_noticia", { validacao: erros, noticia: noticia });
        return;

    }




    var connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connection);

    noticiasModel.salvarNoticia(noticia, function (error, result) {
        res.redirect("/noticias");
    });


}