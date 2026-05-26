# Nasadenie na GitHub Pages

## Krok 1: Vytvor repo na GitHub
1. Choď na https://github.com/new
2. Názov: `zdravie-plus` alebo podobne
3. Klikni "Create repository"

## Krok 2: Pushni kód
```bash
cd "c:\Users\doros\Desktop\Nový priečinok"
git remote add origin https://github.com/daneh471/zdravie-plus.git
git branch -M main
git push -u origin main
```

## Krok 3: Aktivuj GitHub Pages
1. Choď na Settings → Pages
2. Source: main branch
3. Save

Hotovo! App bude dostupná na: https://daneh471.github.io/zdravie-plus/

## Updates na mobile
- Keď pushneš novú verziu na GitHub
- Service Worker detekuje zmenu
- Na mobile sa zobrazí: "Nová verzia aplikácie je dostupná"
- Klik na OK = automatický refresh
