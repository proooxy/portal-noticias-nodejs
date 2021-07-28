function NoticiasDAO(connection) {
	this._connection = connection;

}
/* * from noticias where id_noticia
 */
NoticiasDAO.prototype.getNoticias = function (callback) {
	this._connection.query(`select id_noticia, 
	autor, 
	titulo, 
	resumo, 
	DATE_FORMAT(data_criacao, "%d/%m/%Y %H:%i:%s") as data_criacao,
	noticia
 FROM noticias ORDER BY data_criacao DESC`, callback);
}

NoticiasDAO.prototype.getNoticia = function (id_noticia, callback) {
	this._connection.query(`select id_noticia, 
	autor, 
	titulo, 
	resumo, 
	DATE_FORMAT(data_criacao, "%d/%m/%Y %H:%i:%s") as data_criacao,
	noticia
 FROM noticias 
 WHERE id_noticia = `+ id_noticia.id_noticia, callback);
}

NoticiasDAO.prototype.get5UtimasNoticias = function (callback) {
	this._connection.query(`select id_noticia, 
	autor, 
	titulo, 
	resumo, 
	DATE_FORMAT(data_criacao, "%d/%m/%Y %H:%i:%s") as data_criacao,
	noticia
 FROM noticias 
 ORDER BY data_criacao DESC LIMIT 5 `, callback);
}


NoticiasDAO.prototype.salvarNoticia = function (noticia, callback) {
	console.log(noticia);
	this._connection.query("insert into noticias set ? ", noticia, callback);
}



module.exports = function () {

	return NoticiasDAO;
}