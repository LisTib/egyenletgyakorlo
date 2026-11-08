# Egyenletgyakorló

Online gyakorlóoldal elsőfokú egyismeretlenes egyenletek megoldásához a mérlegelvvel, véletlenszerűen generált feladatokkal.

- egylépéses és kétlépéses egyenletek
- ismeretlen mindkét oldalon
- zárójeles és törtes egyenletek
- vegyes mód, három nehézségi szinttel

**Lépésenkénti mód:** a diák minden lépésnél megadja a mindkét oldalon elvégzett műveletet (pl. `−5`, `+2x`, `:3`, `·4`, zárójelbontás, összevonás), a program pedig felírja az egyenlet új alakját. Ha bekapcsolja „Az új alakot én írom be” lehetőséget, az új alakot is neki kell felírnia, és a program ellenőrzi. Van visszalépés, segítség (javasolt következő lépés) és behelyettesítéses ellenőrzés.

**Csak eredmény mód:** elég x értékét beírni; utána megjelenik a teljes levezetés.

Az oldal egyetlen önálló fájl (`index.html`), build nélkül működik. Az eredmények a böngésző `localStorage`-ában maradnak meg.

## Kipróbálás helyben

Nyisd meg az `index.html` fájlt a böngészőben.

## Ellenőrzés

A feladatgenerátorok és az átalakítások helyességét véletlen feladatokkal futó teszt ellenőrzi:

    node tests/verify.js

## Bővítés

A motor (egyenletábrázolás, átalakítások, feladatgenerátorok) az `index.html` `ENGINE START` és `ENGINE END` jelölése között van. Új feladattípushoz egy új generátorfüggvény és egy bejegyzés kell a `TOPICS` listában.
