# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii:
- ✅ Zväčšené logo (favicon) pod hlavným tlačidlom na 11rem x 11rem
- ✅ Pridaná sekcia "Nastavenia" do menu
- ✅ Implementovaná podpora dvoch jazykov (Slovenčina / Nemčina)
- ✅ Automatické vymazanie polí v manuálnom zázname po uložení
- ✅ Úprava zobrazenia verzie na v1.6
- ✅ Aktualizácia Service Workera na v1.6

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Nový priečinok"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v1.6: Added Settings and Multi-language support (SK/DE)"
git push origin main --force
```

## ⏳ Čo s
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v33)
4. Stlačením **OK** sa app automaticky reloaduje
5. Nová verzia je načítaná! 🎉

## ✅ Hotovo!

GitHub Pages: https://daneh471.github.io/Zdravie_plus/
Vercel: https://zdravieplus123.vercel.app/
