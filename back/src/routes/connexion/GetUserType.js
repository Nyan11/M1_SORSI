const connexion = require("../../db/sql");

class GetUserType {

    constructor(login, password) {
        this.login = login;
        this.password = password;
    }


    getType() {

        const test = this.#request('ADMINISTRATEUR');
        console.log(test);
        if (test === 0) {
            const test2 = this.#request('GESTIONNAIRE');
            if (test2 === 0) {
                const test3 = this.#request('INTERVENANT');
                if (test3 === 0) {
                    console.log("false");
                    return -1;
                }
                else {
                    console.log("intervenant : true");
                    return 2;
                }
            }
            else {
                console.log("gestionnaire : true");
                return 1;
            }
        }
        else {
            console.log("admin : true");
            return 0;
        }
    }

    #request(table) {

        const request = "SELECT * FROM "+table+" WHERE login = ? AND motDePasse = ?";
        connexion.query(request, [this.login, this.password], (error, result) => {

            console.log(result.length);

            if(error) {
                throw error;
            }
            else {
                if (result.length > 0) callback(1);
                else return 0;
            }
        });
    }
}

module.exports = GetUserType;

