# Publicaciones en Facebook
---
## Casos de uso generales
***Caso 1:* Compartir** 
*Salida de éxito*
- Compartir los resultados de las jornadas/rondas.
- Permitir compartir secuencialmente o en desorden si afectan publicaciones anteriores.

*Notas*
- ¿Qué pasa al compartir más de una vez la misma publicación?
- Si se comparten en desorden, ¿qué pasa con el formato "Eliminación directa"?

***Caso 2:* No compartir (Guardar para luego)**
*Notas:*
- Cierra el modal y no realiza la publicación
- Botón visible y habilitado para cuando el usuario decida compartir en algún momento
- No debe de afectar al momento de compartir el algún momento

***Caso 3:* Cerrar el modal inesperadamente**
*Comportamiento actual*
1. Si se tarda en cerrar el modal, puede hacerse la publicación sin informar al usuario con el modal de copiar link.
2. Al hacer clic nuevamente en "Compartir jornada" aparece el modal de copiar link directamente.

***Caso 4:* Modificar resultados después de haber compartido**
*Estado:* **Pendiente**
*(Falta definir el comportamiento esperado)*

***Caso 5:* Doble clic al compartir**
*Comportamiento actual*
- Se cierra el modal
- No realiza la publicación

***Caso 6:* Recargar página mientras se hace la publicación**
*Comportamiento actual*
- No se comparte la publicación.
- El tiempo de respuesta para generar la publicación es el mismo.
- No tiene el mismo comportamiento que el caso 3.

***Caso 7:* Compartir con el máximo de equipos disponibles por el plan del usuario**
*Consideraciones:*
- Tiempo de respuesta
- Visualización de datos

*Errores:*
- En el caso del plan Clase Mundial
    - No se generan todos los partidos en el fixture 
    - Fallo completo del sistema

---
## Casos de uso por formato
### Imágenes mostradas en todos los formatos
**Resultados (imagen)**
*Condiciones:*
1. Información en otra imagen en caso de sobrepasar los resultados
2. Visualización de escudo o imagen por defecto correctamente
3. Visualización del nombre del equipo o si es muy largo (...)
4. Resultados correctos de los enfrentamientos

**Propuestas**
*Eliminación directa*
- Solo mostrar 1 vez los enfrentamientos
    - Sumar el total de goles por equipo (ida y vuelta)
    - Agregar por enfrentamiento los goles de ida y goles de vuelta

**Goleadores (imagen)**
*Condiciones:*
1.- Capitán y jugador(es) registrados
2.- Capitán no registrado
3.- Goles < 0
4.- Muestra de avatar y/o fotografía del jugador o capitán
5.- Muestra de jugador en estado multiequipo



#### Formato: Liga y Liga (ida y vuelta)

*Observaciones:*
- Máximo 42 equipos para generar el fixture sin errores (liga)
- Máximo 30 equipos para generar el fixture sin errores (ida y vuelta)

**Tabla general (imagen)**
*Condiciones:*
1. Muestra de todos los equipos participantes
2. VIsualización de datos correctos
3. Generación de más imágenes en caso de sobrepasar el tamaño de la imagen por la información 

#### Formato: Eliminación directa y Eliminación directa (ida y vuelta)
**Eliminación directa (imagen)**
*Condiciones:*
1. Visualización correcta de enfrentamientos conforme las rondas
2. Visualización de datos de los equipos (nombre, imagen de escudo o avatar)
3. Visualización del ganador por ronda y siguiente enfrentamiento
4. Nombre correcto del torneo

#### Formato: Fase de grupos
**Fase de grupos (imagen)**
*Condiciones:*
1. Nombre del torneo
2. Muestra de todos los grupos del torneo con sus equipos (sean iguales o no)