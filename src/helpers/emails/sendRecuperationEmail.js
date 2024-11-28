import jwt from "jsonwebtoken"
import trasnporterEmail from "./emailTransporter.helpers.js"
import ENVIROMENT from "../../config/enviroment.js"

const sendRecuperationEmail = async (config) => {
    const reset_token = jwt.sign(
        { email: config.email },
        ENVIROMENT.SECRET_KEY,
        { expiresIn: '1d' }
    )

    const resetUrl = `${ENVIROMENT.URL_FRONTEND}/auth/recovery-password/${reset_token}`

    const result = await trasnporterEmail.sendMail({
        subject: 'Recuperar Contraseña',
        to: config.email,
        html: `
        <h1>Recuperar Contraseña</h1>
        <p>Para recuperar tu contraseña da click <a href='${resetUrl}'>aqui</a></p>
    `
    })
    return result
}
export default sendRecuperationEmail