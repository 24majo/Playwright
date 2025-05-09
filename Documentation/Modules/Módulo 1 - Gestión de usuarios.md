# Funcionalidades del sistema Cask'r App

### Módulo 1: Gestión de Usuarios
#### Funcionalidad 1: Registro de organizadores
**ID de prueba:** QA-MOD01-F1
**Descripción:** Permite a los usuarios crear cuentas por diferentes medios (cuenta Gmail, correo electrónico, número de teléfono, Facebook). 

**Precondiciones:**
1. Cuenta de usuario no registrada en Cask'r App
2. Cuenta válida para el registro 
   - Correo electrónico
   - Número de teléfono
   - Cuenta de Gmail
   - Cuenta de Facebook
  
**Datos:**
- Cuenta válida
- Contraseña válida
- Captcha completado

**Casos de éxito**
- **Caso 1:** Registro exitoso por ingreso de datos (correo/teléfono)
- **Caso 2:** Registro exitoso por vinculación con cuenta  (Gmail/Facebook)

**Manejo de errores**
- Error de registro con ingreso de correo electrónico o número de teléfono
    - *Mensaje de error:* Estos datos ya han sido registrados
    - *Mensaje de error:* La contraseña debe contener al menos 8 caracteres
    - *Mensaje de error:* Por favor, complete el captcha
    - *Mensaje de error:* El campo es necesario
    - *Mensaje de error:* Email inválido
    - *Mensaje de error:* El número de teléfono debe tener 10 dígitos y contener solo números
    - *Casos afectados:* Caso 1, registro con correo/teléfono

**Criterios de aceptación QA**
1. Validación de credenciales (correo electrónico/teléfono y contraseña)
2. Campos obligatorios
3. Capcha completado
4. Longitud mínima del campo de contraseña
5. Autenticación de cuentas externas (Google o Facebook)

**Pruebas de validación para QA**
* Verificar que la redirección al formulario de registro y creación de torneo se haga con todos los tipos de ingreso por cuenta
* Validar que los mensajes de error sean claros y aparezcan cuando no se cumpla alguna condición.
* En caso de no completar el formulario de inicio y recargar la página, validar que los registros realizados se guarden y se bloqueen en caso de llegar a un límite.
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores.
  
---

#### Funcionalidad 2: Registro de capitanes
**ID de prueba:** QA-MOD01-F2
**Descripción:** Al registrar un equipo, se ingresan los datos del capitán (nombre completo y teléfono válido), enviando un mensaje de WhatsApp con el link directo para completar el registro y su perfil.

**Precondiciones:**
1. Crear un equipo
2. Entrar al link de registro
3. Completar el registro o validar contraseña (en caso de tener previamente un registro)

**Datos:**
- Número de teléfono válido
- Contraseña válida o correcta
- (Opcional) CURP válida

**Casos de éxito:**
- **Caso 1:** Capitán registrado correctamente
- **Caso 2:** Registro parcial correcto
- **Caso 3:** Registro correcto con CURP válida
- **Caso 4:** Iniciar sesión desde el link de registro
- **Caso 5:** Iniciar sesión desde login de caskr.app

**Manejo de errores**
- *Mensaje de error:* La contraseña es incorrecta
    - *Casos afectados:*
        - Caso 4, iniciar sesión desde link de registro
- *Mensaje de error:* Los datos ingresados no son correctos
  - *Casos afectados:* 
        - Caso 2, registro parcial 
        - Caso 5, inicio de sesión desde login
- *Mensaje de error:* El número ya está en uso por otro jugador
    - *Casos afectados:* 
        - Caso 1, registro de capitán
        - Caso 3, validación de CURP
- *Mensaje de error:* El dorsal ya está en uso
    - *Casos afectados:* 
        - Caso 1, registro de capitán
        - Caso 2, registro de jugador
        - Caso 3, validación de CURP
- *Mensaje de error:* Límite de edad excedido
    - *Casos afectados:* Caso 3, validación de CURP
- *Mensaje de error:* CURP no encontrado en RENAPO
    - *Casos afectados:* Caso 3, validación de CURP
- *Mensaje de error:* CURP registrado previamente
    - *Casos afectados:* Caso 3, validación de CURP

**Criterios de aceptación QA**
1. Campos obligatorios
2. Formato de campos
3. Longitud máxima en campo teléfono (10 caracteres)
4. Longitud mínima en campo contraseña (8 caracteres)
5. Uso de dorsal en jugadores
6. Validación de CURP y comprobación de uso
7. Creación de perfil después de ingresar la contraseña
8. Comprobación de existencia de usuario para redirigir al dashboard o completar el registro

**Pruebas de validación QA**
* Validar que solo se pueda hacer el registro de un capitán por equipo
* Validar que los mensajes de error sean claros y aparezcan cuando no se cumpla alguna condición.
* Comprobar que se asignen valores por defecto después de haber registrado la contraseña y cerrar el registro e ingresar de otra forma con las credenciales asignadas.
* Comprobar que la CURP no exista previamente en el registro de otro jugador.
* Verificar que el dorsal ingresado no esté en uso
* Ingresar imágenes con diferente extensión y contenido.
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores (datos existentes, valores negativos...).

---

#### Funcionalidad 3: Registro de jugadores
**ID de prueba:** QA-MOD01-F3
**Descripción:** Por medio de un link compartido, los usuarios pueden registrarse para formar parte de un equipo como jugador.

**Precondiciones**
1. Enlace de registro válido
2. Número de dorsal no utilizado
3. CURP válida (en caso de que se requiera)
4. Límite de registros no alcanzado

**Casos de éxito**
- Caso 1: Registro de jugador completado
- Caso 2: CURP válida para completar el registro de jugador

**Manejo de errores**
- *Mensaje de error:* Límite de jugadores alcanzado
    - *Casos afectados:* Caso 2, registro de jugador
- *Mensaje de error:* El número ya está en uso por otro jugador
    - *Casos afectados:* 
        - Caso 1, registro de capitán
        - Caso 3, validación de CURP
- *Mensaje de error:* El dorsal ya está en uso
    - *Casos afectados:* 
        - Caso 1, registro de capitán
        - Caso 2, registro de jugador
        - Caso 3, validación de CURP
- *Mensaje de error:* Límite de edad excedido
    - *Casos afectados:* Caso 3, validación de CURP
- *Mensaje de error:* CURP no encontrado en RENAPO
    - *Casos afectados:* Caso 3, validación de CURP
- *Mensaje de error:* CURP registrado previamente
    - *Casos afectados:* Caso 3, validación de CURP

**Criterios de aceptación QA**
1. Campos obligatorios
2. Formato de campos
3. Longitud máxima en campo teléfono (10 caracteres)
4. Longitud mínima en campo contraseña (8 caracteres)
5. Uso de dorsal en jugadores
6. Validación de CURP y comprobación de uso

**Pruebas de validación QA**
* Validar que solo se pueda hacer el registro de un capitán por equipo
* Comprobar que el link de registro permita un límite de registros de jugador
* Validar que solo se muestren los jugadores que completaron con éxito el registro
* Validar que los mensajes de error sean claros y aparezcan cuando no se cumpla alguna condición.
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores.
---
#### Funcionalidad 3: Inicio de sesión
**Descripción:** Permite a los usuarios acceder a su cuenta en caso de estar registrados anteriormente. 

**Precondiciones**
1. Usuario registrado activo
2. Contraseña correcta
3. Cuenta activa (para el caso de cuentas Gmail o Facebook)

**Casos de éxito**
- Caso 1: Validación de información registrada en la base de datos y redirección al dashboard

**Manejo de errores**
- Error de inicio de sesión
    - *Mensaje de error:* Los datos ingresados no son correctos
    - *Mensaje de error:* El campo es necesario
    - *Mensaje de error:* Por favor, complete el captcha solicitados.
    - *Mensaje de error:* La contraseña debe contener almenos 8 caracteres
    - *Casos afectados:* Caso 1, validación de datos

**Criterios de aceptación QA**
1. Validación de credenciales (correo electrónico/teléfono y contraseña)
2. Campos obligatorios
3. Capcha completado
4. Longitud mínima del campo de contraseña
5. Autenticación de cuentas externas (Google o Facebook)

**Pruebas de validación para QA**
* Comprobar la exitencia de cuenta y validación de datos
* Verificar que la redirección al dashboard se haga con todos los tipos de ingreso por cuenta
* Validar que los mensajes de error sean claros y aparezcan cuando no se cumpla alguna condición.
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores.
---
#### Funcionalidad 4: Restablecimiento de contraseña 
**Descripción:** Permite al usuario recuperar su cuenta al olvidar la contraseña por medio de un código enviado a la cuenta ingresada. 

**Precondiciones**
1. Usuario registrado activo
2. Validación de código de acceso al sistema
3. Cambio de contraseña

**Casos de éxito**
- Caso 1: Validación de existencia de cuenta
    - *Mensaje:* Correo enviado. Por favor, revisa tu correo.
    - *Mensaje:* Mensaje enviado. Por favor, revisa tu WhatsApp.
- Caso 2: Enlace de restablecimiento de contraseña
    - *Mensaje:* Escribe tu teléfono o correo a continuación, y te enviaremos un enlace para que puedas restablecer tu contraseña.

**Manejo de errores**
- Cuenta inexistente en Cask'r App
    - *Mensaje de error:* Debes ingresar algún dato
    - *Mensaje de error:* Correo inválido
    - *Mensaje de error:* El número de teléfono debe contener solo números
    - *Mensaje de error:* El número de teléfono debe tener 10 dígitos
    - *Casos afectados:* Caso 1, cuenta registrada

**Criterios de aceptación QA**
1. Campo obligatorio
2. Formato de datos (correo/número de teléfono)
3. Comprobación de cuenta registrada
4. Envío de enlace a la cuenta proporcionada
5. Cambio de contraseña

**Pruebas de validación para QA**
* Comprobar la existencia de cuenta y validación de datos
* Verificar envío de código de acceso a la cuenta proporcionada
* Comprobar que el código proporcionado por el usuario sea válido
* Verificar que la contraseña de acceso se haya cambiado una vez se haya cambiado
* Realizar pruebas con diferentes cuentas existentes para validar la funcionalidad y el manejo de errores
---
#### Funcionalidad 5: Cerrar sesión 
**Descripción:** Permite a los usuarios cerrar sesión de su cuenta en la plataforma, finalizando su sesión activa y asegurando que no puedan acceder sin volver a autenticarse.  

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)

**Casos de éxito**
- Caso 1: El usuario cierra su sesión

**Manejo de errores**
- Casos afectados: Caso 1, cerrar sesión

**Criterios de aceptación**
1. El usuario puede cerrar sesión cuando lo desee desde la opción correspondiente
2. El usuario no puede acceder nuevamente a su cuenta hasta autenticarse nuevamente

**Pruebas de validación para QA**
* Opción de "Cerrar sesión" disponible para el usuario
* Redirección al index al cerrar sesión

---
#### Funcionalidad 6: Nuevo usuario
**Descripción:** Si la cuenta del usuario es nueva, redirige a un formulario de alta para registro de datos personales, generar un nuevo torneo y agregar otros elementos (opcional). 

**Precondiciones**
1. Usuario nuevo registrado
2. No haber completado el formulario de inicio

**Casos de éxito**
- Caso 1: Envío a formulario de registro al iniciar sesión con una cuenta nueva
- Caso 2: Al completar el formulario, redirige al dashboard con los datos agregados

**Manejo de errores**
| Error | Descripción       | Resultado esperado |
|:-----:|:-----------------:|:------:|
|Recargar página|Registro máximo de torneos|Omitir formulario de creación de torneo|
|Recargar página|Registro máximo de equipos|Bloquear opción de Añadir equipo|
|Recargar página|Cambio de datos personales|Registra el último dato ingresado al completar el formulario|
---
#### Funcionalidad 7: Edición de perfil 
**Descripción:** Permite a los jugadores y capitanes editar su información personal y/o de jugador.

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)

**Casos de éxito**
* Caso 1: El jugador o capitán edita con éxito sus datos personales y/o de jugador.

**Manejo de errores**
- Mensaje de error: El dorsal ya está en uso
    - Casos afectados: Caso 1, edición de datos

**Criterios de aceptación**
1. Validación de campos
2. Comprobación de dorsal en uso o disponible
3. Eliminación o actualización de imagen

**Pruebas de validación para QA**
* Actualización de cambios y visualización en los espacios disponibles
* Funcionamiento de servicio de API de extracción de fondo de imagen
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores
---
#### Funcionalidad 8: Gestión de equipos 
**Descripción:** Permite a los capitanes gestionar su equipo y a los organizadores administrar los equipos registrados en su perfil.

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Tener rol de Capitán u Organizador para habilitar las opciones de acuerdo con su rol.

**Casos de éxito**
Realizar las siguientes acciones con base en su rol de usuario en la plataforma.
| | Crear equipo | Editar escudo | Editar nombre | Editar info. capitán | Cambiar estatus | Asignar a torneo | Ver estadísticas | Ver jugadores |
|:---:|:--------:|:--------:|:--------------:|:--------------------:|:---------------:|:---------------:|:----------------:|:-------------:|
|**Caso 1:** Capitán||✓|✓|✓|||✓|✓
|**Caso 2:** Organizador|✓|✓|✓|✓|✓|✓||✓|

**Criterios de aceptación**
1. Validación de campos
2. Formato válido de campos
3. Visualización de datos actualizada

**Pruebas de validación para QA**
* Si los datos son modificados, deben de reflejarse en todas las vistas donde se muestran los datos.
* Un usuario puede realizar estas modificaciones solo si tiene el rol de Capitán u Organizador.
* Para la modificación de datos, realizar pruebas con diferentes tipos de datos para validar la funcionalidad, restricciones y manejo de errores.

