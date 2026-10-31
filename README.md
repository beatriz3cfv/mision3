# Personajes de Harry Potter

Misión M3 · Reactor Core — Web Development I. \
Reconstrucción en **React** de la app de la misión M2 (Async Odyssey). Datos de la [API de Harry Potter](https://hp-api.onrender.com).

## Cómo probarlo
```bash
npm install
npm run dev
```

Escribe el nombre de un personaje (por ejemplo "Weasley" o "Harry") o una casa (Gryffindor, Slytherin, Ravenclaw, Hufflepuff) y pulsa «Buscar» o Enter. También puedes pulsar los botones de casa, que muestran cuántos personajes hay en cada una, y combinarlos con el texto. Al hacer click en un personaje (o pulsar Enter con la tarjeta enfocada) se abre una ficha con toda su información (se cierra con la X, con click fuera o con Esc).


## Uso de IA
Usé Gemini para ayudarme a estructurar el JavaScript en distintos ficheros y para la ventana modal de la misión anterior.

Después usé Claude para revisar la misión M2 (loading real, eliminar el `setTimeout` artificial, caché y filtros con `reduce`) y, en esta misión, para ayudarme a convertir el proyecto a React siguiendo los apuntes de la Unidad 3. He revisado el código resultante y sé explicar cada parte.

## Autopsia
1. **Estado mínimo y valores derivados.** `App` solo guarda lo que el usuario cambia: texto del input (`draft`), búsqueda aplicada (`query`), casa (`house`) y personaje abierto (`selectedId`). Los contadores por casa, la lista visible y el personaje abierto se calculan durante el render, no se guardan.

2. **`useEffect` solo para sincronizar con el exterior.** Hay dos: `useFetch` (pide los datos a la API o los lee de la caché, y cancela la petición en el cleanup) y `CharacterModal` (listener de Esc, que se quita al desmontar). Filtrar, contar y abrir la ficha se resuelven con eventos y valores derivados, no con efectos.

3. **Custom hook `useFetch`.** Recibe una función de carga y, opcionalmente, una clave y un TTL de caché; devuelve `{ data, error, loading, retry }`. No sabe nada de personajes, así que se puede reutilizar con cualquier API.

4. **Seguridad al pintar.** React escapa por defecto lo que se interpola en JSX, así que ya no hace falta `escapeHTML` ni se usa `dangerouslySetInnerHTML`.
