# Nasadenie (GitHub Pages alebo Vercel)

## Krok 1: Vytvor repo na GitHub
1. Choď na https://github.com/new
2. Názov: `Zdravie_plus`
3. Klikni "Create repository"

## Krok 2: Pushni kód
```bash
cd "c:\Users\doros\Desktop\Nový priečinok"
git remote add origin https://github.com/daneh471/Zdravie_plus.git
git branch -M main
git push -u origin main
```

## Krok 3: Aktivuj GitHub Pages
1. Choď na Settings → Pages
2. Source: main branch
3. Save

App na GitHub Pages: https://daneh471.github.io/Zdravie_plus/

## Produkcia: Vercel
1. Prihlás sa na [Vercel.com](https://vercel.com)
2. Importuj repozitár `Zdravie_plus`
3. Deployment je automatický po každom pushi.
App na Vercel: https://zdravieplus123.vercel.app/

## Updates na mobile
- Keď pushneš novú verziu na GitHub (Pages/Vercel)
- Service Worker detekuje zmenu
- Na mobile sa zobrazí: "Nová verzia aplikácie je dostupná"
- Klik na OK = automatický refresh
