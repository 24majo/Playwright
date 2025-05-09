## Módulo 8: Mis torneos
### Funcionalidad 1: Crear torneo 
**Descripción:** Permite al organizador crear y gestionar torneos de acuerdo con su tipo de plan

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de organizador
3. Tener al menos un torneo activo

**Casos de éxito**
- Caso 1: Crear un nuevo torneo

**Manejo de errores**
|Caso|Descripción|Acción|
|:--:|:----------|:-----|
|1|Límite de torneos alcanzados para crear|Bloqueo de 'Crear torneo' bloqueado|
|2|Límite de torneos activos|El organizador puede elegir que torneo quiere desactivar|

**Criterios de aceptación QA**
1. Validación de campos
2. Formato de campos
3. Cantidad de torneos permitida por plan actual del organizador
4. Muestra de registros actuales para crear nuevo torneo (Equipos, Árbitros)

**Pruebas de validación QA**
* Mensaje de desactivación de torneos en caso de superar el máximo permitido y que este no pueda quitarse hasta seleccionar la cantidad de torneos excedentes.
* Permitir registro de nuevos equipos o elección de ya existentes de diferentes maneras.
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores

---
### Funcionalidad 2: Editar torneo 
**Descripción:** Editar un torneo ya registrado y añadir elementos mientras sea permitido por el plan actual del organizador. Permitido en un torneo en estado Activo o Inactivo. 

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de organizador
3. Tener registro de por lo menos un torneo (Módulo 8 - Funcionalidad 1)

**Casos de éxito**
- Caso 1: Edición de torneo exitosa

**Manejo de errores**
- Si la modalidad del torneo es flexible, no permite actualizar a modalidad formal
    - Casos afectados: Caso 1, editar torneo
- Si el torneo tiene partidos programados, no es posible cambiar el formato y la modalidad
    - Casos afectados: Caso 1. editar torneo
- *Mensaje de error:* El nombre es necesario
    - Casos afectados: Caso 1, editar torneo

**Criterios de aceptación QA**
1. Validación de campos
2. Formato de campos
3. Condiciones del formato, modalidad y registros del torneo

**Pruebas de validación QA**
* Comprobar las condiciones de cambio de formato y modalidad de torneo, evitando afectar la vista y funcionalidad de otros módulos (Módulo 5 - Calendario)
* Comprobar que la modalidad y formato del torneo devuelvan los mismos valores que el torneo a modificar.
* Realizar pruebas con diferentes combinaciones de datos para validar la funcionalidad y el manejo de errores

--- 
### Funcionalidad 3: Eliminar torneo 
**Descripción:** Eliminar un torneo en estado Activo o Inactivo, siempre y cuando no esté siendo administrado actualmente. 

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de organizador
3. Tener registro de por lo menos un torneo (Módulo 8 - Funcionalidad 1)
4. No ser administrado en el perfil actual

**Casos de éxito**
- Caso 1: Eliminación de torneo en el perfil del administrador

**Manejo de errores**
- *Mensaje de error:* No puedes eliminar este torneo ya que actualmente te encuentras administrándolo, para eliminarlo primero cambia a un torneo distinto.
    - Casos afectados: Caso 1, eliminar torneo

**Criterios de aceptación QA**
1. Eliminación de torneo, esté activo o no
2. Eliminar torneo, haya finalizado o no
2. Evitar eliminación si está actualmente administrándolo 

**Pruebas de validación QA**
* Validar funcionamiento y condiciones de eliminación para un torneo

---
### Funcionalidad 4: Torneos inactivos
**Descripción:** Pestaña de torneos inactivos para que el organizador pueda ver los detalles de torneos que han finalizado

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Haber finalizado un torneo

**Casos de éxito**
- Caso 1: Vista de torneos finalizados en estado inactivo

**Criterios de aceptación QA**
1. Muestra solo los torneos que han finalizado
2. La opción no se muestra hasta que haya un torneo en estado Inactivo

**Pruebas de validación QA**
* Verificar las condiciones para mostrar la opción de Torneos Inactivos
* Comprobar que solo se encuentren torneos en estado Inactivo


--- 
### Funcionalidad 5: Compartir torneo 
**Descripción:** Copiar link en el portapapeles del equipo para compartir los detalles actuales del progreso del torneo

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Tener al menos un torneo (Módulo 8 - Funcionalidad 1)

**Casos de éxito**
- Caso 1: Link copiado en el portapapeles
- Caso 2: Acceso al link para visualización de progreso de ese torneo 

**Criterios de aceptación QA**
1. Copiar link en el portapapeles
2. Link válido para acceder

**Pruebas de validación QA**
* Ver el progreso del torneo con los resultados y posiciones actuales
* Confirmación de datos del torneo actual 