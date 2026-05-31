# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii:
- ✅ Vynútené 'no-store' pre fetch dopyty v Service Workeri
- ✅ Meta tagy pre zamedzenie ukladania HTML do cache prehliadača
- ✅ Úprava zobrazenia verzie na v2.3
- ✅ Aktualizácia Service Workera na v2.3

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\zdravieplus"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v2.3: Cache busting and meta tag fixes"
git push origin main --force
```

## ⏳ Čo s
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v2.0)
4. Stlačením **OK** sa app automaticky reloaduje
5. Nová verzia je načítaná! 🎉

## ✅ Hotovo!

GitHub Pages: https://daneh471.github.io/Zdravie_plus/
Vercel: https://zdravieplus123.vercel.app/
