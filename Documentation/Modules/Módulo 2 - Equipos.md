## Módulo 2 - Equipos
### Funcionalidad 1: Agregar equipos
**Descripción:** Permite al organizador crear y gestionar equipos para asignarlos a torneos

**Precondiciones**
1. Módulo 1 - Funcionalidad 3
2. Rol de organizador
3. API disponible para extracción de fondo de imagen
4. Sistema de colas para procesamiento de imagen disponible

**Casos de éxito**
* Caso 1: Agregar un equipo y asignar al torneo activo actual del organizador

**Manejo de errores**
| Caso | Error | Soluciones o acciones permitidas |
|:----:|:-----:|:------:|
|1|No es posible agregar por torneo activo|Esperar a que el torneo finalice. Iniciar otro torneo.
|2|Límite de equipos alcanzado|Cambiar a un plan de mayor beneficio o adquirir addon|
|3|No es posible agregar por partidos agendados|Esperar a que el torneo finalice. Iniciar otro torneo. Eliminar el calendario actual y esperar la confirmación del usuario.|
|4|Desactivación de equipos (excente al plan actual)|El organizador selecciona los equipos que desea desactivar|
|5|El nombre es obligatorio|Ingresar un dato para nombre del equipo|
|6|El nombre es necesario|Ingresar nombre del capitán del equipo|
|7|El apellido es obligatorio|Ingresar apellido(s) del capitán del equipo|
|8|El teléfono es obligatorio|Añadir un teléfono perteneciente el capitán|
|9|Ingresa solo letras|Ingresar solo letras en los campos de nombre y apellido|
|10|El teléfono ya existe|Agregar otro número de teléfono|

**Criterios de aceptación QA**
1. Validación de campos
2. Formato de campos
3. Cantidad dde equipos actual
4. Agregar equipos bajo condiciones permitidas
5. Mostrar todos los equipos registrados

**Pruebas de validación para QA**
* Verificar el procesamiento de imagen correcto y que esto no afecte el tiempo de carga mínimo o promedio
* Comprobar que los datos ingresados sean los correctos al agregar equipo
* Confirmar envío de link de invitación al capitán con el teléfono ingresado
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores

---
### Funcionalidad 2: Editar equipo
**Descripción:** Actualizar uno o varios datos del equipo seleccionado, así como activar o desactivar su estatus de participación en un torneo.

**Precondiciones**
1. Módulo 1 - Funcionalidad 3
2. Rol de Organizador
3. Módulo 2- Funcionalidad 1
4. API disponible para extracción de fondo de imagen
5. Sistema de colas para procesamiento de imagen disponible

**Casos de éxito**
* Caso 1: Editar datos del equipo y visualizarlos al momento

**Manejo de errores**
- Error de edición de equipos
    - *Mensaje de error*: El nombre es obligatorio
    - *Mensaje de error*: El nombre es necesario
    - *Mensaje de error*: El apellido es obligatorio
    - *Mensaje de error*: El teléfono es obligatorio
    - *Mensaje de error*: Ingrese solo letras
    - *Mensaje de error:* El teléfono ya existe
    - *Casos afectados:* Caso 1, editar equipo

**Criterios de aceptación QA**
1. Validación de campos
2. Formato de campos
3. Visualizar estado actual del equipo (activo/inactivo)

**Pruebas de validación para QA**
* Verificar el procesamiento de imagen correcto y que esto no afecte el tiempo de carga mínimo o promedio
* Comprobar que los datos ingresados sean los correctos al agregar equipo
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores

---
### Funcionalidad 3: Eliminar equipo
**Descripción:** Permite al organizador eliminar un equipo, siempre y cuando cumpla las condiciones necesarias.

**Precondiciones**
1. Módulo 1 - Funcionalidad 3
2. Rol de Organizador
3. Módulo 2- Funcionalidad 1

**Casos de éxito**
* Caso 1: Eliminación exitosa

**Manejo de errores**
- No puedes eliminar este equipo porque tiene partidos agendados
    - Casos afectados: Caso 1, eliminar equipo

**Pruebas de validación para QA**
* Confirmar que el equipo puede eliminarse siempre y cuando no tenga partidos agendados.