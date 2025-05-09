## Módulo 5: Calendario
### Funcionalidad 1: Generar calendario
**Descripción:** Crear calendario de programación de partidos por torneo para llevar a cabo un registro ordenado de los juegos que ocurrirán durante la jornada.

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Tener al menos dos equipos registrados y en estado 'Activo' (Módulo 2- Funcionalidad 1)
4. Cumplir los requisitos del torneo
5. Tener un torneo activo (Módulo 8 - Funcionalidad 1)

**Casos de éxito**
* *Caso 1:* Generar fixture en formato liga
* *Caso 2:* Generar fixture en formato eliminación directa cumpliendo los requisitos previos 
* *Caso 3:* Generar fixture en formato fase de grupos

**Manejo de errores**
- Cantidad mínima de equipos activos para participar
  - Casos afectados: Caso 1, Caso 2, Caso 3
- La cantidad de equipos incorrecta deberia ser: 2, 4, 8, 16 ...
    - Casos afectados: Caso 2, generar fixture

**Criterios de aceptación QA**
1. Validar los requisitos necesarios paga generar un calendario
2. No tomar en cuenta los equipos con estado 'Inactivo'

**Pruebas de validación para QA**
* Prueba de generación de calendario con cada tipo de torneo en diferente formato y modalidad.
* Respetar el mínimo de equipos necesarios para generarlo
* Comprobar que el calendario se elimina en estos casos: 
   - Añadir un nuevo equipo 
   - Deshabilitar un equipo
   - Eliminar un equipo
   - Cambiar el formato del torneo
   - Cambiar la modalidad (solo disponible si es Formal)
   - **Bajo estas condiciones:**
       - Modalidad formal
       - No tener partidos agendados 

---
### Funcionalidad 2: Agendar partidos
**Descripción:** Agendar todos los partidos del torneo activo actual con los detalles obligatorios y/u opcionales

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Tener al menos dos equipos registrados y en estado 'Activo' (Módulo 2- Funcionalidad 1)
4. Haber generado un calendario (Módulo 5 - Funcionalidad 1)
5. Tener un torneo activo (Módulo 8 - Funcionalidad 1)
6. Tener una cancha registrada (Módulo 3 - Funcionalidad 1) (opcional)
7. Tener un árbitro registrado (Módulo 4 - Funcionalidad 1) (opcional)

**Casos de éxito**
| Caso | Descripción |
|:----:|:------------|
|1|Agendar partido en modalidad formal|
|1.1|Por jornada (liga / liga ida y vuelta)|
|1.2|Por ronda (eliminación directa / eliminación directa ida y vuelta)|
|2|Agendar partido en modalidad flexible|
|2.1|Por jornada (liga / liga ida y vuelta)|
|2.2|Por ronda (eliminación directa / eliminación directa ida y vuelta)|
|3|Por fase de Grupos|

**Manejo de errores**
| Mensaje | Modalidad formal | Modalidad flexible |
|:--------|:----------------:|:------------------:|
|La fecha es obligatoria|x|x|
|El equipo local es obligatorio||x|
|El equipo visitante es obligatorio||x|
|Revisar cancha y/o árbitro|x|x|
|Algo salió mal|x|x|

**Criterios de aceptación QA**
1. Validación de campos
2. Disponibilidad de horario y elementos (cancha y/o árbitro)
3. Cubrir requerimientos de cada modalidad y partido
4. Notificaciones a capitanes y árbitros

**Pruebas de validación para QA**
* Prueba de inserción de datos para cumplir las condiciones de éxito y error.
* Envío de mensajes a capitanes de cada equipo y árbitros

