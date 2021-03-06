const express = require("express");
const connection = require("../db");
const router = express.Router();

//for sending a message to a follower or with a username on the messages page
router.post("/messages-page", (req, res) => {
  console.log("POST /api/message");
  const { messageSubject, messageBody, recipientProfileID } = req.body;
  async function sendMessage() {
    try {
      const [insertedMessage, insertedMessageFields] = await connection
        .promise()
        .query(
          `INSERT INTO Message (subject, body, sender_id, recipient_id, timestamp) 
              VALUES (?, ?, ?, 
              (SELECT RegisteredUser.reg_user_id
               FROM RegisteredUser
               JOIN User ON RegisteredUser.user_id = User.user_id
               JOIN Account ON User.user_id = Account.user_id
               JOIN Profile ON Profile.account_id = Account.account_id
               WHERE Profile.profile_id = ?), 
               NOW())`,
          [
            messageSubject,
            messageBody,
            req.session.reg_user_id,
            recipientProfileID,
          ]
        );

      console.log("insertedMessage: ", insertedMessage);
      console.log("insertedMessageFields: ", insertedMessageFields);

      const [insertedMessageInfo, _] = await connection.promise().query(
        `SELECT Profile.display_name, Profile.profile_pic_link, Message.timestamp
            FROM Message
            JOIN Profile ON Profile.profile_id = ?
            WHERE Message.message_id = ?
          `,
        [recipientProfileID, insertedMessage.insertId]
      );

      console.log("insertedMessageInfo: ", insertedMessageInfo);

      return res.status(200).json({
        message_id: insertedMessage.insertId,
        subject: messageSubject,
        body: messageBody,
        profile_pic_link: insertedMessageInfo[0].profile_pic_link,
        display_name: insertedMessageInfo[0].display_name,
        timestamp: insertedMessageInfo[0].timestamp,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
  sendMessage();
});

//for sending a message through a profile
router.post("/profile-page", (req, res) => {
  //console.log(req.body);
  //console.log("POST /api/message-profile")
  connection.query(
    `INSERT INTO Message (subject, body, sender_id, recipient_id, timestamp) 
         VALUES (?, ?, ?, 
         (SELECT RegisteredUser.reg_user_id
          FROM RegisteredUser
          JOIN User ON RegisteredUser.user_id = User.user_id
          JOIN Account ON User.user_id = Account.user_id
          WHERE Account.account_id = ?), 
          NOW())`,
    [
      req.body.messageSubject,
      req.body.messageBody,
      req.session.reg_user_id,
      req.body.recipientAccountID,
    ],
    function (err, result) {
      if (err) {
        //console.log(err);
        res.status(500).json(err);
      } else {
        //console.log(result);
        res.status(200).json(result);
      }
    }
  );
});

router.post("/reply", (req, res) => {
  connection.query(
    `INSERT INTO Message (subject, body, sender_id, recipient_id, timestamp, reply_id, read_flag)
           VALUES ("RE: " + ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.body.selectedMessage.subject,
      req.body.replyBody,
      req.session.reg_user_id,
      req.body.selectedMessage.sender_id,
      NOW(),
      req.body.selectedMessage.message_id,
      false,
    ],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        //console.log(result)
        res.status(200).json({
          body: req.body.replyBody,
        });
      }
    }
  );
});

// router.get("/api/replies", (req,res) =>{
//      connection.query
//          (`SELECT *
//           FROM Message
//           WHERE Message.message_id =
//           () Message.reply_Id`)
// })

module.exports = router;
