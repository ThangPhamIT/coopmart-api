var nodemailer = require('nodemailer');

const from = '"Coopmart Mini Test" <coopmart@coopmart.vn>';
const to = `noreply.it91@gmail.com`;

function setup() {
    return nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'noreply.it91@gmail.com',
            pass: 'Onlyme_18101992_zero'
        },
        tls: {
            rejectUnauthorized: false
        }

    })
}

function sendEmailSubmitTest(test) {
    const transport = setup();

    let testing = test.testing;
    let bodyEmail = '';
    let index = 1;
    testing.forEach(element => {
        bodyEmail += `<tr> 
            <td>${index}</td>
            <td>${element.question}</td>
            <td>${element.answer}</td>
        </tr>
        `
        index ++;
    });

    const email = {
        from,
        to,
        subject: `Kết quả bài làm của ${test.username}. (Bộ phận - ${test.department})`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
            <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            
            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 5px;
            }
            
            tr:nth-child(even) {
                background-color: #dddddd;
            }
            </style>
            </head>
            <body>

            <table>
            <tr>
                <th>#</th>
                <th>CÂU HỎI</th>
                <th>ĐÁP ÁN</th>
            </tr>
            ${bodyEmail}
            </table>
            
            </body>
            </html>
        
        `
    };

    transport.sendMail(email, (err, res) => {
        if (err) {
            console.log('Can not send email to gmail: ', err);
        } else {
            console.log('Send email to gmail successfully: ', res);
        }
    });
};

module.exports = sendEmailSubmitTest;