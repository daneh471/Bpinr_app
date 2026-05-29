# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii:
- ✅ Rozdelenie archívu na "Aktuálny mesiac" a "Mesačný archív" (minulosť)
- ✅ Aktuálny mesiac sa zobrazuje ako priamy zoznam pre okamžitý prehľad
- ✅ Staršie záznamy sa automaticky zoskupujú do rozbaľovacích priečinkov
- ✅ Logika automatického presunu záznamov pri zmene kalendárneho mesiaca
- ✅ Aktualizácia Service Workera na v60

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Nový priečinok"
git remote set-url origin https://github.com/daneh471/Zdravie-test5.git
git add .
git commit -m "Update v60: Dynamic archive split (Current vs Past)"
git push origin main --force
```

## ⏳ Čo s
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v33)
4. Stlačením **OK** sa app automaticky reloaduje
5. Nová verzia je načítaná! 🎉

## ✅ Hotovo!

Aplikácia na: https://daneh471.github.io/Zdravie-test5/
