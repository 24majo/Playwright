## Módulo 6: Resultados
### Funcionalidad 1: Registro de resultados
**Descripción:** Agregar resultados a un partido una vez haya sido agendado

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Haber agendado un partido (Módulo 5 - Funcionalidad 2)

**Casos de éxito**
- Caso 1: Registro de resultados a equipo local y equipo visitante
    - Goles totales
    - Goles por jugador de equipo
    - Tarjeta amarillas por equipo
    - Tarjetas rojas por equipo

**Manejo de errores**
- *Mensaje de error:* El partido no puede quedar empatado.
    - Casos afectados: Caso 1, registrar resultados
    - Formato: Eliminación directa y Eliminación directa (ida y vuelta)
- *Mensaje de error:* Los goles de los jugadores locales superan los goles del equipo local.
    - Casos afectados: Caso 1, registrar resultados
- *Mensaje de error:* Los goles de los jugadores visitantes superan los goles del equipo visitante.
    - Casos afectados: Caso 1, registrar resultados

**Criterios de aceptación QA**
1. Validación de campos
2. Muestra de resultados para campo de búsqueda de jugador 

**Pruebas de validación QA**
* Congruencia de cantidad de goles totales con goles por jugadores
* Visualización de registro de resultados sin recargar página
---
### Funcionalidad 2: Edición de resultados
**Descripción:** Editar el resultado de un partido ya registrado para cambiar las estadísticas y resultados

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Haber agendado un partido (Módulo 5 - Funcionalidad 2)
4. Haber registrado por lo menos un resultado (Módulo 6 - Funcionalidad 1)

**Casos de éxito**
- Caso 1: Modificación exitosa de resultado previamente registrado de un partido agendado

**Manejo de errores**
- *Mensaje de error:* El partido no puede quedar empatado.
    - Casos afectados: Caso 1, modificar resultados
    - Formato: Eliminación directa y Eliminación directa (ida y vuelta)
- *Mensaje de error:* Los goles de los jugadores locales superan los goles del equipo local.
    - Casos afectados: Caso 1, modificar resultados
- *Mensaje de error:* Los goles de los jugadores visitantes superan los goles del equipo visitante.
    - Casos afectados: Caso 1, modificar resultados

**Criterios de aceptación QA**
1. Validación de campos
2. Muestra de resultados para campo de búsqueda de jugador 

**Pruebas de validación**
* Congruencia de cantidad de goles totales con goles por jugadores
* Visualización de registro de resultados sin recargar página
---
### Funcionalidad 3: Visualización de datos por formato
**Descripción:** Mostrar los registros de partidos de acuerdo al formato del torneo (tipo Liga o Eliminación directa)

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Haber agendado un partido (Módulo 5 - Funcionalidad 2)
4. Haber registrado por lo menos un resultado (Módulo 6 - Funcionalidad 1)

**Casos de éxito**
| Caso | Formato Liga | Formato Eliminación directa |
|:----:|:------------:|:---------------------------:|
|Registrar resultado|Registrar todos los partidos que estén previamente agendados|Al terminar los registros por etapa (Ronda n, Semifinal) se genera la siguiente etapa de acuerdo a los resultados obtenidos|

**Criterios de aceptación QA**
1. Desbloqueo de botones de "Registrar" resultado al tener partidos agendados
2. Para formato "Eliminación directa", generar la siguiente etapa al terminar el registro de resultados de una etapa anterior
3. Al registrar un resultado, cambiar el título del botón por "Editar"
4. Para el formato de "Eliminación directa (Ida y Vuelta)", se deben de visualizar los botones de "Registrar Ida" y "Registrar vuelta"

**Pruebas de validación QA**
* Lógica de bloqueo y desbloqueo de botones al cumplir los requerimientos necesarios
* Generación de rondas lógica
---
### Funcionalidad 4: Generar liguilla
**Descripción:** Generación de nuevo torneo, cumpliendo las mismas o características similares, eligiendo la misma cantidad o una menor de equipos para una nueva competencia, permitiendo cambiar el formato de torneo.

**Precondiciones**
1. Haber iniciado sesión (Módulo 1 - Funcionalidad 3)
2. Rol de Organizador
3. Tener al menos dos equipos registrados y en estado 'Activo' (Módulo 2 - Funcionalidad 1)
4. Haber finalizado un torneo en formato Liga o Liga (Ida y vuelta)

**Casos de éxito**
* Caso 1: Generar nueva liguilla con las modificaciones elegidas

**Manejo de errores**
| Error | Liga | Eliminación directa |
|:-----:|:----:|:-------------------:|
|El partido no puede quedar empatado||x|
|La cantidad de equipos incorrecta deberia ser: 2, 4, 8, 16 ...||x|
|El equipo local ya está agendado|x|x|
|El equipo visitante ya está agendado|x|x|
|La fecha es obligatoria|x|x|
|El equipo local es obligatorio||x|
|El equipo visitante es obligatorio||x|
|Revisar cancha y/o árbitro|x|x|
|Algo salió mal|x|x|

**Criterios de aceptación QA**
1. Validación de campos
2. Validar agenda de equipos que tienen partido programado
3. Disponibilidad de horario y elementos (cancha y/o árbitro)
3. Cubrir requerimientos de cada modalidad y partido
4. Notificaciones a capitanes y árbitros

**Pruebas de validación para QA**
* Prueba de inserción de datos para cumplir las condiciones de éxito y error
* Envío de mensajes a capitanes de cada equipo y árbitros
* Comprobación de que todos los equipos se encuentren en un partido agendado
* Validar selecciones del usuario en caso de no realizar acciones recomendadas