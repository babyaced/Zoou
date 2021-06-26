//Will contain all sign-up related routes
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const connection = require("../db");

function passwordValidate(password) {
    var re = {
        capital: /[A-Z]/,
        digit: /[0-9]/,
        special: /[!@#$%^&*]/,
        full: /^[A-Za-z0-9!@$%^&*]{8,}$/,
    };
    return (
        re.capital.test(password) &&
        re.digit.test(password) &&
        re.special.test(password) &&
        re.full.test(password)
    );
}

router.post("/api/sign-up", (req, res) => {
    //console.log("/sign-up");
    const givenEmail = req.body.email;
    const givenUsername = req.body.uname;
    const givenFirstName = req.body.firstName;
    const givenLastName = req.body.lastName;
    const givenPassword = req.body.password;
    const givenResubmitted = req.body.redonePassword;

    connection.getConnection(function (err, conn) {
        if (err) { res.status(500).json(err) }
        else {
            conn.beginTransaction(function (err) {
                if (err) {
                    console.log(err)
                    res.status(500).json(err);
                }
                else {
                    let userEmails
                    conn.query("SELECT user_id FROM User WHERE email=?", [givenEmail],  //check if email is taken)
                        function (err, result) {
                            if (err) {
                                return conn.rollback(function () {
                                    console.log(err)
                                    res.status(500).json(err);
                                })
                            }
                            else {
                                // console.log(result.length);
                                userEmails = result
                                let userUsernames
                                if (userEmails.length === 0) {
                                    conn.query("SELECT username FROM Credentials WHERE username=?", [givenUsername],
                                        function (err, result) {  //check if username is taken
                                            if (err) {
                                                return conn.rollback(function () {
                                                    console.log(err)
                                                    res.status(500).json(err);
                                                })
                                            }
                                            else {
                                                userUsernames = result
                                                let insertedUserID
                                                if (userUsernames.length === 0) {
                                                    if (passwordValidate(givenPassword)) {  //if password is valid
                                                        if (givenPassword === givenResubmitted) {  //if password and confirmed password match
                                                            const hash = bcrypt.hashSync(givenPassword, 10);

                                                            conn.query(
                                                                `INSERT INTO User (email,first_name, last_name) VALUES (?,?,?)`,
                                                                [givenEmail, givenFirstName, givenLastName],
                                                                function (err, result) {
                                                                    if (err) {
                                                                        return conn.rollback(function () {
                                                                            console.log(err)
                                                                            res.status(500).json(err);
                                                                        })
                                                                    }
                                                                    else {
                                                                        insertedUserID = result.insertId
                                                                        let insertedAccountID
                                                                        conn.query(
                                                                            `INSERT INTO Account (user_id, role_id)  VALUES  (?,?)`,
                                                                            [insertedUserID, 1], //create new account in database with returned user_id  and assign role of pet owner//registered user entry and profile automatically created
                                                                            function (err, result) {
                                                                                if (err) {
                                                                                    return conn.rollback(function () {
                                                                                        console.log(err)
                                                                                        res.status(500).json(err);
                                                                                    })
                                                                                }
                                                                                else {
                                                                                    insertedAccountID = result.insertId;
                                                                                    conn.query(
                                                                                        `INSERT INTO Credentials (acct_id, username, password) VALUES (?,?,?)`,
                                                                                        [insertedAccountID, givenUsername, hash],
                                                                                        function (err, result) {
                                                                                            if (err) {
                                                                                                return conn.rollback(function () {
                                                                                                    console.log(err)
                                                                                                    res.status(500).json(err);
                                                                                                })
                                                                                            }
                                                                                            else {
                                                                                                conn.query(
                                                                                                    `UPDATE Profile SET Profile.display_name = ? , Profile.type = ? WHERE  Profile.account_id = ?`,
                                                                                                    [givenFirstName, "PetOwner", insertedAccountID],
                                                                                                    function (err, result) {
                                                                                                        if (err) {
                                                                                                            return conn.rollback(function () {
                                                                                                                console.log(err)
                                                                                                                res.status(500).json(err);
                                                                                                            })
                                                                                                        }
                                                                                                        else {
                                                                                                            conn.commit(function (err) {
                                                                                                                if (err) {
                                                                                                                    return conn.rollback(function () {
                                                                                                                        res.status(500).json(err);
                                                                                                                    })
                                                                                                                }
                                                                                                                else {
                                                                                                                    console.log('success')
                                                                                                                    res.status(200).json("success")
                                                                                                                }
                                                                                                            })
                                                                                                        }
                                                                                                    }
                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    )
                                                                                }
                                                                            }
                                                                        )

                                                                    }
                                                                }
                                                            )
                                                        }
                                                        else { res.status(400).json("passwords not matching"); }
                                                    }
                                                    else { res.status(400).json("password requirements"); }
                                                }
                                                else { res.status(400).json("exists"); }

                                            }
                                        }
                                    )
                                }
                                else { res.status(400).json("exists"); }
                            }
                        }
                    )
                }
            });
        }
    })
})

router.post("/api/sign-up/business", (req, res) => {
    //regular sign up
    //console.log("/sign-up");
    const givenEmail = req.body.email;
    const givenUsername = req.body.uname;
    const givenFirstName = req.body.firstName;
    const givenLastName = req.body.lastName;
    const givenPassword = req.body.password;
    const givenResubmitted = req.body.redonePassword;
    const givenBusinessName = req.body.businessName;
    const givenPhoneNumber = req.body.phoneNumber;
    const givenAddress = req.body.address;
    const givenLatitude = req.body.latitude;
    const givenLongitude = req.body.longitude;
    const givenBusinessType = req.body.type;

    connection.getConnection(function (err, conn) {
        if (err) { res.status(500).json(err) }
        else {
            conn.beginTransaction(function (err) {
                if (err) {
                    console.log(err)
                    res.status(500).json(err);
                }
                else {
                    let userEmails
                    conn.query("SELECT user_id FROM User WHERE email=?", [givenEmail],  //check if email is taken)
                        function (err, result) {
                            if (err) {
                                return conn.rollback(function () {
                                    console.log('SELECT user_id', err)
                                    res.status(500).json(err);
                                })
                            }
                            else {
                                // console.log(result.length);
                                userEmails = result
                                let userUsernames
                                if (userEmails.length === 0) {
                                    conn.query("SELECT username FROM Credentials WHERE username=?", [givenUsername],
                                        function (err, result) {  //check if username is taken
                                            if (err) {
                                                return conn.rollback(function () {
                                                    console.log('SELECT username', err)
                                                    res.status(500).json(err);
                                                })
                                            }
                                            else {
                                                userUsernames = result
                                                let insertedUserID
                                                if (userUsernames.length === 0) {
                                                    if (passwordValidate(givenPassword)) {  //if password is valid
                                                        if (givenPassword === givenResubmitted) {  //if password and confirmed password match
                                                            const hash = bcrypt.hashSync(givenPassword, 10);

                                                            conn.query(
                                                                `INSERT INTO User (email,first_name, last_name) VALUES (?,?,?)`,
                                                                [givenEmail, givenFirstName, givenLastName],
                                                                function (err, result) {
                                                                    if (err) {
                                                                        return conn.rollback(function () {
                                                                            console.log('INSERT INTO User', err)
                                                                            res.status(500).json(err);
                                                                        })
                                                                    }
                                                                    else {
                                                                        insertedUserID = result.insertId
                                                                        let insertedAccountID
                                                                        conn.query(
                                                                            `INSERT INTO Account (user_id, role_id)  VALUES  (?,?)`,
                                                                            [insertedUserID, 2], //create new account in database with returned user_id  and assign role of pet owner//registered user entry and profile automatically created
                                                                            function (err, result) {
                                                                                if (err) {
                                                                                    return conn.rollback(function () {
                                                                                        console.log('INSERT INTO Account', err)
                                                                                        res.status(500).json(err);
                                                                                    })
                                                                                }
                                                                                else {
                                                                                    insertedAccountID = result.insertId;
                                                                                    conn.query(
                                                                                        `INSERT INTO Credentials (acct_id, username, password) VALUES (?,?,?)`,
                                                                                        [insertedAccountID, givenUsername, hash],
                                                                                        function (err, result) {
                                                                                            if (err) {
                                                                                                return conn.rollback(function () {
                                                                                                    console.log('INSERT INTO Credentials', err)
                                                                                                    res.status(500).json(err);
                                                                                                })
                                                                                            }
                                                                                            else {
                                                                                                conn.query(
                                                                                                    `INSERT INTO Address (address, latitude, longitude, reg_user_id) VALUES (?, ?, ?,(SELECT reg_user_id FROM RegisteredUser WHERE user_id= ?))`,
                                                                                                    [
                                                                                                        givenAddress,
                                                                                                        givenLatitude,
                                                                                                        givenLongitude,
                                                                                                        insertedUserID,
                                                                                                    ],
                                                                                                    function (err, result) {
                                                                                                        if (err) {
                                                                                                            return conn.rollback(function () {
                                                                                                                console.log('INSERT INTO Address', err)
                                                                                                                res.status(500).json(err);
                                                                                                            })
                                                                                                        }
                                                                                                        else {
                                                                                                            let insertedBusinessID
                                                                                                            conn.query(
                                                                                                                `INSERT INTO Business (name, phone_num, reg_user_id) VALUES (?, ?, (SELECT reg_user_id FROM RegisteredUser WHERE user_id= ?))`,
                                                                                                                [
                                                                                                                    givenBusinessName,
                                                                                                                    givenPhoneNumber,
                                                                                                                    insertedUserID,
                                                                                                                ],
                                                                                                                function (err, result) {
                                                                                                                    if (err) {
                                                                                                                        return conn.rollback(function () {
                                                                                                                            console.log('INSERT INTO Business', err)
                                                                                                                            res.status(500).json(err);
                                                                                                                        })
                                                                                                                    }
                                                                                                                    insertedBusinessID = result.insertId
                                                                                                                    console.log(insertedBusinessID)
                                                                                                                    console.log(givenBusinessType)
                                                                                                                    conn.query(
                                                                                                                        `INSERT INTO Commerce (business_id, business_type_id) VALUES (?, ?)`,
                                                                                                                        [
                                                                                                                            insertedBusinessID,
                                                                                                                            givenBusinessType,
                                                                                                                        ],
                                                                                                                        function (err, insertedCommerce) {
                                                                                                                            if (err) {
                                                                                                                                return conn.rollback(function () {
                                                                                                                                    console.log('INSERT INTO Commerce', err)
                                                                                                                                    res.status(500).json(err);
                                                                                                                                })
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                conn.query(
                                                                                                                                    `UPDATE Profile SET Profile.display_name = ?, Profile.type = 'Business' WHERE  Profile.account_id = ?`,
                                                                                                                                    [givenBusinessName, insertedAccountID],
                                                                                                                                    function (
                                                                                                                                        err,
                                                                                                                                        updatedDisplayName
                                                                                                                                    ) {
                                                                                                                                        if (err) {
                                                                                                                                            return conn.rollback(function () {
                                                                                                                                                console.log('UPDATE Profile', err)
                                                                                                                                                res.status(500).json(err);
                                                                                                                                            })
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            conn.commit(function (err) {
                                                                                                                                                if (err) {
                                                                                                                                                    return conn.rollback(function () {
                                                                                                                                                        res.status(500).json(err);
                                                                                                                                                    })
                                                                                                                                                }
                                                                                                                                                else {
                                                                                                                                                    console.log('success')
                                                                                                                                                    res.status(200).json("success")
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                )
                                                                                                                            }
                                                                                                                        }
                                                                                                                    )
                                                                                                                }
                                                                                                            )
                                                                                                        }
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                        }
                                                                                    )
                                                                                }
                                                                            }
                                                                        )
                                                                    }
                                                                }
                                                            )
                                                        }
                                                        else { res.status(400).json("passwords not matching"); }
                                                    }
                                                    else { res.status(400).json("password requirements"); }
                                                }
                                                else { res.status(400).json("exists"); }
                                            }
                                        }
                                    )
                                }
                                else { res.status(400).json("exists"); }
                            }
                        }
                    )
                }
            })
        }
    })
});

router.post("/api/sign-up/shelter", (req, res) => {
    //console.log("/sign-up/shelter");
    const givenEmail = req.body.email;
    const givenUsername = req.body.uname;
    const givenFirstName = req.body.firstName;
    const givenLastName = req.body.lastName;
    const givenPassword = req.body.password;
    const givenResubmitted = req.body.redonePassword;
    const givenBusinessName = req.body.businessName;
    const givenPhoneNumber = req.body.phoneNumber;
    const givenAddress = req.body.address;
    const givenLatitude = req.body.latitude;
    const givenLongitude = req.body.longitude;
    const givenPetTypes = req.body.petTypes;

    var userId;

    connection.getConnection(function (err, conn) {
        if (err) { res.status(500).json(err) }
        else {
            conn.beginTransaction(function (err) {
                if (err) {
                    console.log('beginTransaction', err)
                    res.status(500).json(err);
                }
                else {
                    let userEmails
                    conn.query("SELECT user_id FROM User WHERE email=?", [givenEmail],  //check if email is taken)
                        function (err, result) {
                            if (err) {
                                return conn.rollback(function () {
                                    console.log("SELECT user_id FROM User WHERE email=?", err)
                                    res.status(500).json(err);
                                })
                            }
                            else {
                                // console.log(result.length);
                                userEmails = result
                                let userUsernames
                                if (userEmails.length === 0) {
                                    conn.query("SELECT username FROM Credentials WHERE username=?", [givenUsername],
                                        function (err, result) {  //check if username is taken
                                            if (err) {
                                                return conn.rollback(function () {
                                                    console.log("SELECT username FROM Credentials WHERE username=?", err)
                                                    res.status(500).json(err);
                                                })
                                            }
                                            else {
                                                userUsernames = result
                                                let insertedUserID
                                                if (userUsernames.length === 0) {
                                                    if (passwordValidate(givenPassword)) {  //if password is valid
                                                        if (givenPassword === givenResubmitted) {  //if password and confirmed password match
                                                            const hash = bcrypt.hashSync(givenPassword, 10);

                                                            conn.query(
                                                                `INSERT INTO User (email,first_name, last_name) VALUES (?,?,?)`,
                                                                [givenEmail, givenFirstName, givenLastName],
                                                                function (err, result) {
                                                                    if (err) {
                                                                        return conn.rollback(function () {
                                                                            console.log(`INSERT INTO User (email,first_name, last_name) VALUES (?,?,?)`, err)
                                                                            res.status(500).json(err);
                                                                        })
                                                                    }
                                                                    else {
                                                                        insertedUserID = result.insertId
                                                                        let insertedAccountID
                                                                        conn.query(
                                                                            `INSERT INTO Account (user_id, role_id)  VALUES  (?,?)`,
                                                                            [insertedUserID, 3], //create new account in database with returned user_id  and assign role of pet owner//registered user entry and profile automatically created
                                                                            function (err, result) {
                                                                                if (err) {
                                                                                    return conn.rollback(function () {
                                                                                        console.log(`INSERT INTO Account (user_id, role_id)  VALUES  (?,?)`, err)
                                                                                        res.status(500).json(err);
                                                                                    })
                                                                                }
                                                                                else {
                                                                                    insertedAccountID = result.insertId;
                                                                                    conn.query(
                                                                                        `INSERT INTO Credentials (acct_id, username, password) VALUES (?,?,?)`,
                                                                                        [insertedAccountID, givenUsername, hash],
                                                                                        function (err, result) {
                                                                                            if (err) {
                                                                                                return conn.rollback(function () {
                                                                                                    console.log(`INSERT INTO Credentials (acct_id, username, password) VALUES (?,?,?)`, err)
                                                                                                    res.status(500).json(err);
                                                                                                })
                                                                                            }
                                                                                            else {
                                                                                                conn.query(
                                                                                                    `INSERT INTO Address (address, latitude, longitude, reg_user_id) VALUES (?, ?, ?,(SELECT reg_user_id FROM RegisteredUser WHERE user_id= ?))`,
                                                                                                    [
                                                                                                        givenAddress,
                                                                                                        givenLatitude,
                                                                                                        givenLongitude,
                                                                                                        insertedUserID,
                                                                                                    ],
                                                                                                    function (err, result) {
                                                                                                        if (err) {
                                                                                                            return conn.rollback(function () {
                                                                                                                console.log(`INSERT INTO Address (address, latitude, longitude, reg_user_id) VALUES (?, ?, ?,(SELECT reg_user_id FROM RegisteredUser WHERE user_id= ?))`, err)
                                                                                                                res.status(500).json(err);
                                                                                                            })
                                                                                                        }
                                                                                                        else {
                                                                                                            let insertedBusinessID
                                                                                                            conn.query(
                                                                                                                `INSERT INTO Business (name, phone_num, reg_user_id) VALUES (?, ?, (SELECT reg_user_id FROM RegisteredUser WHERE user_id= ?))`,
                                                                                                                [
                                                                                                                    givenBusinessName,
                                                                                                                    givenPhoneNumber,
                                                                                                                    insertedUserID,
                                                                                                                ],
                                                                                                                function (err, result) {
                                                                                                                    if (err) {
                                                                                                                        return conn.rollback(function () {
                                                                                                                            console.log(`INSERT INTO Business (name, phone_num, reg_user_id) VALUES (?, ?, (SELECT reg_user_id FROM RegisteredUser WHERE user_id= ?))`, err)
                                                                                                                            res.status(500).json(err);
                                                                                                                        })
                                                                                                                    }
                                                                                                                    insertedBusinessID = result.insertId
                                                                                                                    console.log('insertedBusinessID', insertedBusinessID)
                                                                                                                    let insertedShelterID
                                                                                                                    conn.query(
                                                                                                                        `INSERT INTO Shelter (business_id) VALUES (?)`,
                                                                                                                        [
                                                                                                                            insertedBusinessID
                                                                                                                        ],
                                                                                                                        function (err, result) {
                                                                                                                            if (err) {
                                                                                                                                return conn.rollback(function () {
                                                                                                                                    console.log(`INSERT INTO Shelter (business_id) VALUES (?)`, err)
                                                                                                                                    res.status(500).json(err);
                                                                                                                                })
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                insertedShelterID = result.insertId
                                                                                                                                for (
                                                                                                                                    let i = 0;
                                                                                                                                    i < givenPetTypes.length;
                                                                                                                                    i++
                                                                                                                                ) {
                                                                                                                                    conn.query(
                                                                                                                                        `INSERT INTO ShelterTypes (shelter_id, type_id) VALUES (?, ?)`,
                                                                                                                                        [
                                                                                                                                            insertedShelterID,
                                                                                                                                            givenPetTypes[i].value,
                                                                                                                                        ],
                                                                                                                                        function (
                                                                                                                                            err,
                                                                                                                                            result
                                                                                                                                        ) {
                                                                                                                                            if (err) {
                                                                                                                                                return conn.rollback(function () {
                                                                                                                                                    console.log(`INSERT INTO ShelterTypes (shelter_id, type_id) VALUES (?, ?)`, err)
                                                                                                                                                    res.status(500).json(err);
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    );
                                                                                                                                }
                                                                                                                                conn.query(
                                                                                                                                    `UPDATE Profile SET Profile.display_name = ?, Profile.type = 'Shelter' WHERE  Profile.account_id = ?`,
                                                                                                                                    [givenBusinessName, insertedAccountID],
                                                                                                                                    function (
                                                                                                                                        err,
                                                                                                                                        updatedDisplayName
                                                                                                                                    ) {
                                                                                                                                        if (err) {
                                                                                                                                            return conn.rollback(function () {
                                                                                                                                                console.log(err)
                                                                                                                                                res.status(500).json(`UPDATE Profile SET Profile.display_name = ?, Profile.type = 'Shelter' WHERE  Profile.account_id = ?`, err);
                                                                                                                                            })
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            conn.commit(function (err) {
                                                                                                                                                if (err) {
                                                                                                                                                    return conn.rollback(function () {
                                                                                                                                                        console.log(err)
                                                                                                                                                        res.status(500).json('commit', err);
                                                                                                                                                    })
                                                                                                                                                }
                                                                                                                                                else {
                                                                                                                                                    console.log('success')
                                                                                                                                                    res.status(200).json("success")
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                )
                                                                                                                            }
                                                                                                                        }
                                                                                                                    )
                                                                                                                }
                                                                                                            )
                                                                                                        }
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                        }
                                                                                    )
                                                                                }
                                                                            }
                                                                        )
                                                                    }
                                                                }
                                                            )
                                                        }
                                                        else { res.status(400).json("passwords not matching"); }
                                                    }
                                                    else { res.status(400).json("password requirements"); }
                                                }
                                                else { res.status(400).json("exists"); }
                                            }
                                        }
                                    )
                                }
                                else { res.status(400).json("exists"); }
                            }
                        }
                    )
                }
            })
        }
    })
});

router.post("/api/sign-up/validate", (req, res) => {
    //for sign up page 1 on business and shelter pages
    //console.log("/sign-up/validate");
    const givenEmail = req.body.email;
    const givenUsername = req.body.username;
    const givenPassword = req.body.password;
    const givenResubmitted = req.body.redonePassword;

    connection.query(
        "SELECT user_id FROM User WHERE email=?",
        givenEmail, //check if email is taken
        function (err, users) {
            if (users.length === 0) {
                //if email isn't taken
                connection.query(
                    "SELECT username FROM Credentials WHERE username=?",
                    givenUsername,
                    function (err, usernames) {
                        //check if username is taken
                        if (err) {
                            console.log(err)
                            res.status(500).json(err);
                        }
                        else {
                            if (usernames.length === 0) {
                                if (givenPassword === givenResubmitted) {
                                    if (passwordValidate(givenPassword)) {
                                        //if password is valid
                                        res.status(200).json("valid");
                                    }
                                    else {
                                        res.status(400).json("password requirements");
                                    }
                                }
                                else {
                                    res.status(400).json("passwords not matching");
                                }
                            }
                            else if (usernames.length != 0) {
                                //console.log("Username is taken")
                                res.status(400).json("exists");
                            }
                        }
                    }
                );
            }
            else if (users.length != 0) {
                //console.log("Email is taken")
                res.status(400).json("exists");
            }
        }
    );
});

module.exports = router;
