## Módulo 4: Árbitros
### Funcionalidad 1: Agregar árbitro
**Descripción:** Ingresar de manera ilimitada datos de árbitros

**Precondiciones**
1. Módulo 1 - Funcionalidad 3
2. Rol de organizador

**Casos de éxito**
* Caso 1: Agregar y visualizar un árbitro registrado

**Manejo de errores**
- Error de registro de árbitro
    - *Mensaje de error:* El nombre es necesario
    - *Mensaje de error:* El apellido es necesario
    - *Mensaje de error:* El teléfono es obligatorio
    - *Mensaje de error:* El teléfono debe tener mínimo 10 dígitos
    - *Mensaje de error:* Correo inválido
    - *Mensaje de error:* El nombre/apellido solo puede contener letras
    - *Casos afectados:* Caso 1, registro de árbitro

**Criterios de aceptación QA**
1. Validación de campos
2. Formato de campos

**Pruebas de validación para QA**
* Comprobar que los datos ingresados sean los correctos al añadir un nuevo árbitro
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores

---
### Funcionalidad 2: Editar árbitro
**Descripción:** El organizador puede modificar uno o todos los datos de un árbitro

**Precondiciones**
1. Módulo 1 - Funcionalidad 3
2. Rol de organizador
3. Módulo 4 - Funcionalidad 1

**Casos de éxito**
* Caso 1: Editar datos y visualizar cambios al modificar un árbitro

**Manejo de errores**
- Error de edición de árbitro
    - *Mensaje de error:* El nombre es necesario
    - *Mensaje de error:* El apellido es necesario
    - *Mensaje de error:* El teléfono es obligatorio
    - *Mensaje de error:* El teléfono debe tener mínimo 10 dígitos
    - *Mensaje de error:* Correo inválido
    - *Mensaje de error:* El nombre/apellido solo puede contener letras
    - *Casos afectados:* Caso 1, editar árbitro

**Criterios de aceptación QA**
1. Validación de campos
2. Formato de campos

**Pruebas de validación para QA**
* Comprobar que los datos ingresados sean los correctos al modificar un árbitro existente
* Visualizar los cambios sin necesidad de recargar la página
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores
---
### Funcionalidad 3: Eliminar árbitro
**Descripción:** Eliminar un árbitro en caso de que no esté asignado a un partido

**Precondiciones**
1. Módulo 1 - Funcionalidad 3
2. Rol de organizador
3. Módulo 4 - Funcionalidad 1

**Casos de éxito**
* Caso 1: Eliminación exitosa

**Manejo de errores**
- El árbitrto no pudo ser eliminado por que ya ha sido asignado a un partido.
    - Casos afectados: Caso 1, eliminar árbitro

**Criterios de aceptación QA**
1. Validar condiciones de eliminación de árbitro
2. Realizar acción con base en la selección del organizador al eliminar o no un árbitro

**Pruebas de validación para QA**
* Verificar la eliminación del árbitro seleccionado bajo las condiciones requeridas y que sus datos ya no aparezcan en las opciones de selección y/o visualización.