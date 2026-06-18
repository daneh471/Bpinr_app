# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii (v1.75):
- ✅ FUNKCIA: Vylepšená logika archívu váhy (prepíše záznam v rámci rovnakého mesiaca).
- ✅ DIZAJN: Modré tlačidlo pre PDF export vo všetkých oknách aplikácie pre lepšiu konzistenciu.
- ✅ SYSTÉM: Vynútená globálna aktualizácia (všetky doterajšie funkcie vrátane gest a PDF fixov).

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Programovanie\Web a App_V1_01\Bpinr_app_v1_01"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v1.75: Weight archive logic, blue PDF buttons, full update"
git push -u origin main --force
```

## ⏳ Čo sa stane potom:
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v1.72)
3. Stlačením **OK** v aplikácii sa vykoná aktualizácia
4. Nová verzia BP & INR je pripravená! 🎉

## ✅ Hotovo!

Hlavná doména: https://app.bpinr.sk/
Záloha (GitHub Pages): https://daneh471.github.io/Zdravie_plus/
Záloha (Vercel): https://zdravie-plus-ma1j.vercel.app/