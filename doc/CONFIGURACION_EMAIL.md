# Configuración del Formulario de Contacto

## 📧 Envío de Emails con Nodemailer + Gmail

Este proyecto utiliza Nodemailer para enviar emails desde el formulario de contacto directamente a tu Gmail (o cualquier otro proveedor SMTP).

### Pasos para configurar con Gmail:

1. **Habilitar verificación en 2 pasos**
   - Ve a tu cuenta de Google: [myaccount.google.com](https://myaccount.google.com)
   - Seguridad → Verificación en dos pasos
   - Actívala si no lo está

2. **Crear contraseña de aplicación**
   - Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Selecciona "Otro (nombre personalizado)"
   - Escribe "Portfolio" o cualquier nombre
   - Haz clic en "Generar"
   - Copia la contraseña de 16 caracteres (sin espacios)

3. **Obtener claves de Google reCAPTCHA v3**
   - Ve a [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
   - Haz clic en "+" para crear un nuevo sitio
   - Configuración:
     - **Etiqueta**: Portfolio (o el nombre que quieras)
     - **Tipo de reCAPTCHA**: reCAPTCHA v3
     - **Dominios**: 
       - `localhost` (para desarrollo)
       - `tu-dominio.com` (para producción)
   - Acepta términos y haz clic en "Enviar"
   - Copia la **Clave del sitio** y la **Clave secreta**

4. **Configurar variables de entorno**
   - Crea el archivo `.env.local` en la raíz del proyecto
   - Agrega tus credenciales:
     ```env
     # Gmail
     EMAIL_USER=tu@gmail.com
     EMAIL_PASSWORD=abc123def456ghij  # La contraseña de aplicación generada
     CONTACT_EMAIL=tu@gmail.com  # Donde recibirás los mensajes
     
     # Google reCAPTCHA v3
     NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu-site-key-aqui
     RECAPTCHA_SECRET_KEY=tu-secret-key-aqui
     ```

5. **Reinicia el servidor**
   ```bash
   npm run dev
   ```

### Variables de entorno requeridas:

```env
# Tu email de Gmail
EMAIL_USER=tu@gmail.com

# Contraseña de aplicación (NO tu contraseña normal)
EMAIL_PASSWORD=abc123def456ghij

# Email donde recibirás los mensajes (puede ser el mismo)
CONTACT_EMAIL=tu@gmail.com

# Google reCAPTCHA v3 (Site Key - pública)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxE

# Google reCAPTCHA v3 (Secret Key - privada)
RECAPTCHA_SECRET_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxF
```

### ⚠️ Importante:

- ✅ Usa una **contraseña de aplicación**, NO tu contraseña normal de Gmail
- ✅ La contraseña de aplicación es de 16 caracteres sin espacios
- ✅ Necesitas tener la verificación en 2 pasos activada
- ✅ Las variables están en `.env.local` (no se suben a git)

### Usar otros proveedores de email:

**Outlook/Hotmail:**
```javascript
service: 'hotmail'
```

**Yahoo:**
```javascript
service: 'yahoo'
```

**Otro SMTP personalizado:**
```javascript
{
  host: 'smtp.tuservidor.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
}
```

### Estructura del email enviado:

- **De**: Tu email configurado
- **Para**: Tu email (CONTACT_EMAIL)
- **Reply-To**: Email del usuario que envió el formulario
- **Asunto**: [Portfolio] + asunto del formulario
- **Contenido**: HTML formateado con toda la información

### Solución de problemas:

**Error "Invalid login":**
- Verifica que usas la contraseña de aplicación, no tu contraseña normal
- Asegúrate de que la verificación en 2 pasos está activada

**Email no llega:**
- Revisa la carpeta de spam
- Verifica que las variables de entorno estén correctas
- Revisa los logs del servidor

### Seguridad:

- ✅ Las credenciales están en `.env.local` (no se suben a git)
- ✅ Validación con Zod antes de enviar
- ✅ **Rate limiting**: 5 minutos entre envíos (cliente + servidor)
- ✅ **Google reCAPTCHA v3**: Protección invisible contra bots
- ✅ **Validación por IP**: El servidor rastrea IPs para prevenir spam
- ✅ El email del usuario se usa como Reply-To para responder fácilmente
- ✅ Completamente gratis, sin límites de envío para uso personal

### 🛡️ Protección Anti-Spam:

**1. Rate Limiting (5 minutos)**
- **Cliente**: Cookies + localStorage bloquean envíos frecuentes
- **Servidor**: Tracking por IP con validación independiente
- Mensaje amigable muestra tiempo restante

**2. Google reCAPTCHA v3**
- **Invisible**: No requiere clics del usuario
- **Score-based**: Rechaza solicitudes con score < 0.5
- **Protección real**: Validación en servidor previene bypass
- **Gratis**: Hasta 1,000,000 evaluaciones/mes

**Cómo funciona:**
1. Usuario llena el formulario
2. reCAPTCHA genera token invisible en segundo plano
3. Token se envía al servidor junto con datos del formulario
4. Servidor verifica token con Google
5. Si score ≥ 0.5 y rate limit OK → envía email
6. Si falla cualquier validación → rechaza con error apropiado
