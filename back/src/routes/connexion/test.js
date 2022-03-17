const connexion = require("../../db/sql");

module.exports = {

    getType: function(login, password) {
        const request1 = "SELECT * FROM ADMINISTRATEUR WHERE login=? AND motDePasse=?";
        connexion.query(request1, [login, password], (error, result) => {

            //console.log("ADMIN" + result.length);
            if (error) throw error;
            else {
                if (result.length > 0) {
                    console.log(JSON.stringify(result));
                    return 0;
                }
                else {
                    return -1;
                }
            }
        });
    }
}
