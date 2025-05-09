### Multiequipos
---
**Caso 1: Capitán <-> Jugador (mismo equipo)**
- *Capitán*
   - Registro completo
   - Sin registro completo

- *Jugador*
   - Registro completo
   - Sin registro completo

---

**Caso 2: Capitán <-> jugador (diferente equipo)**
- Ambos regitros completos
- Capitán sin completar, luego jugador sin completar
- Jugador intentando registrarse antes que modo capitán (*error:* perfil de capitán no completado)

---

**Caso 3: Capitán <-> Capitán**
- Completando ambos registros
- Completando uno, sin completar uno
- Sin completar uno, no registrando uno

---

**Caso 4: Jugador en más de 2 equipos**
- Sin completar un registro
- Solo un registro completado

---

**Caso 5: Cambio de capitán por un jugador (mismo equipo)**

# Pendiente por problemáticas
---

**Caso 6: Cambio de capitán por un jugador (diferente equipo)**

# Pendiente por flujo
---

**Validaciones:**
- En caso de no haber completado un registro, se deben de agregar valores por defecto:
    - Posición
    - Dorsal
    - Avatar
- El perfil del jugador se crea al ingresar las credenciales.
    - Número y contraseña (jugador).
    - Contraseña (capitán)

---

**Problemáticas:**
- ¿Qué pasa en caso de que el capitán al volverse jugador, exceda la cantidad de jugadores permitidos en el equipo? (Esto para el caso 2)
- Al ser capitán de un equipo y jugador de otro, pueden o no enfrentarse en un torneo formal. ¿Qué acciones ejecutará la plataforma?

---

**Propuestas generales:**
- Modal o warning al usuario para verificar si quiere realizar ese cambio/actualización de capitán.
- Modal para indicar que la acción no puede realizarse.
- Cambio de capitán solo por jugadores del mismo equipo
- Cambio directo de elección de capitán por perfil de capitán (cuando sea jugador del mismo equipo).