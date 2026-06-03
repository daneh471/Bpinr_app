# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii:
- ✅ Vynútenie aktualizácie pre všetky zariadenia (Fix cache)
- ✅ Archív: Aktuálny mesiac + tlačidlo pre staršie mesiace
- ✅ Premenovanie aplikácie na BP & INR
- ✅ Fix: Dokonalé vycentrovanie názvu na malých displejoch (v3.5)

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Programovanie\zdravieplus"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v3.5: Rename app to BP & INR"
git push origin main --force
```

## ⏳ Čo sa stane potom:
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v3.5)
3. Stlačením **OK** v aplikácii sa vykoná aktualizácia
4. **POZOR:** Ak sa názov na ploche nezmenil, vymaž starú ikonu a pridaj aplikáciu na plochu znova cez prehliadač.
5. Nová verzia BP & INR je pripravená! 🎉

## ✅ Hotovo!

GitHub Pages: https://daneh471.github.io/Zdravie_plus/
Vercel: zdravie-plus-ma1j.vercel.app