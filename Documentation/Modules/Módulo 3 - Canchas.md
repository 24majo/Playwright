## Módulo 3: Canchas
#### Funcionalidad 1: Agregar cancha 
**Descripción:** Agregar canchas de manera ilimitada por el organizador

**Precondiciones**
1. Módulo 1 - Funcionalidad 3
2. Rol de Organizador
3. API disponible para autocompletar la dirección proporcionada

**Casos de éxito**
* Caso 1: Agregar cancha con ubicación definida en Google Maps
* Caso 2: Agregar cancha con ubicación manual
* Caso 3: Agregar cancha sin imagen

**Manejo de errores**
- Error al agregar cancha
    - *Mensaje de error:* El nombre es necesario
    - *Mensaje de error:* La dirección es obligatoria
    - *Mensaje de error:* La descripción es obligatoria
    - *Casos afectados:* 
        - Caso 1, Agregar cancha con ubicación
        - Caso 2, Agregar cancha con ubicación manual
        - Caso 3, Agregar cancha sin imagen

**Criterios de aceptación QA**
1. Validación de campos
2. Autocompletado de dirección en campo por medio de la API
3. Asignación de imagen por defecto en caso de no agregar alguna

**Pruebas de validación para QA**
* Agregar canchas de manera ilimitada para el organizador
* Validar redirección a página de Google Maps con dirección proporcionada
* En caso de no definir una ubicación, mantenerse en dashboard/canchas si se quiere visualizar la opción de Ubicación
* Comprobar la insección y visualización de imagen por defecto en caso de no agregar alguna.
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores
---
#### Funcionalidad 2: Editar cancha 
**Descripción:** Permite a los usuarios modificar una cancha previamente registrada

**Precondiciones**
1. Módulo 1 - Funcionalidad 3
2. Módulo 2 - Funcionalidad 1
3. Rol de organizador
4. API disponible para autocompletar la dirección proporcionada

**Casos de éxito**
* Caso 1: Actualización de uno o todos los datos modificados
* Caso 2: Cambio de imagen actualizada en visualización general
* Caso 3: Redirección a ubicación actualizada proporcionada o mantenerse en el dashboard/canchas en caso de haberse agregado manualmente y no ser identificada.

**Criterios de aceptación**
1. Validación de campos
2. Actualización del o los datos modificados y mantener los que se dejaron igual en vista general
3. Actualización de redirección de ubicación 

**Pruebas de validación para QA**
* Verificar los datos modificados en la vista general
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad, autocompletado de la API y manejo de errores.
---
#### Funcionalidad 3: Eliminar cancha 
**Descripción:** Permite eliminar una cancha registrada previamente, siempre y cuando no tenga partidos agendados.

**Precondiciones**
1. Módulo 1 - Funcionalidad 3
2. Módulo 2 - Funcionalidad 1
3. Rol de organizador

**Casos de éxito**
* Caso 1: Eliminación de cancha exitosa

**Manejo de errores**
- Mensaje de error: No puedes eliminar está cancha ya que ha sido asignada a un partido.
    - Casos afectados: Caso 1, eliminar cancha

**Criterios de aceptación**
1. Preguntar al usuario si está seguro de eliminar la cancha
2. Validar la confirmación del usuario en caso de eliminar la cancha
3. Comprobar que la cancha no sea visible en ningún apartado

**Pruebas de validación para QA**
* Comprobar la respuesta del usuario para saber si eliminar o no una cancha
* Verificar que la cancha no tenga partidos agendados para eliminar
