/** Valeurs éditoriales à remplacer avant une commercialisation publique. */
export const landingConfig = {
  brand: "fideli",
  currency: "EUR",
  currencySymbol: "€",
  roi: {
    customersPerDay: { initial: 35, min: 5, max: 200, step: 1 },
    averageBasket: { initial: 18, min: 5, max: 150, step: 1 },
    openDays: { initial: 24, min: 5, max: 31, step: 1 },
    hypotheticalGrowth: { initial: 5, min: 0, max: 20, step: 1 },
  },
  pricing: {
    trialDays: 30,
    annualDiscountLabel: "2 mois offerts",
    taxLabel: "HT",
    availability: "Tarifs indicatifs · aucun paiement intégré à ce stade · sans carte bancaire pour l’essai",
    plans: [
      { id: "essentiel", name: "Essentiel", monthly: 9, annualPerMonth: 7, highlight: false, tagline: "Moins cher qu’un café par jour", features: ["1 établissement", "Page d’inscription + QR code", "Tampons ou points", "1 caisse, tableau de bord de base"] },
      { id: "pro", name: "Pro", monthly: 19, annualPerMonth: 15, highlight: true, tagline: "Le plus choisi par les commerces réguliers", features: ["Tout Essentiel", "Paliers Bronze / Argent / Or", "Parrainage client", "Statistiques par caissier", "Statistiques détaillées", "Clients qui ne reviennent plus"] },
      { id: "multi", name: "Multi-boutiques", monthly: 39, annualPerMonth: 31, highlight: false, tagline: "Pour plusieurs points de vente", features: ["Tout Pro", "Jusqu’à 5 établissements", "Caissiers illimités et statistiques par caissier", "Support prioritaire"] },
    ],
  },
  trust: [
    { icon: "🔒", title: "Anti-fraude intégré", description: "Un passage ne peut être validé qu’une fois toutes les 10 minutes par client, avec historique des opérations." },
    { icon: "🇪🇺", title: "Données protégées (RGPD)", description: "Consentement clair, suppression du compte et des données en un clic, hébergement européen possible." },
    { icon: "↩", title: "Sans engagement", description: "Essai de 30 jours sans carte bancaire, résiliation quand vous voulez." },
  ],
  differentiators: [
    "Aucune application à télécharger : un QR code, un lien, et c’est parti",
    "Mise en route en 5 minutes avec un modèle prêt par métier (café, coiffeur, restaurant)",
    "Scan par QR code, compatible avec les cartes physiques",
    "Carte pensée pour le Wallet du téléphone (intégration synchronisée à venir)",
  ],
  programExample: { pointsPerVisit: 10, rewardPoints: 80 },
  mockupExample: { cardPoints: 50, visitsThisMonth: 24 },
} as const;

export const landingFeatures = [
  { icon: "▦", title: "Un QR code par commerce", description: "Une page d’inscription à partager en caisse, sur vos supports ou en ligne." },
  { icon: "✳", title: "Une carte toujours accessible", description: "Le client retrouve son solde et sa récompense depuis son espace personnel." },
  { icon: "+", title: "Des points à chaque visite", description: "Validez les passages depuis l’espace commerçant et suivez la progression." },
  { icon: "◫", title: "Un tableau de bord clair", description: "Consultez les adhésions, les visites et les récompenses de votre établissement." },
  { icon: "♡", title: "Un retour client privé", description: "Recueillez un ressenti rapide, sans conditionner le bonus à une note positive." },
  { icon: "↗", title: "Des cartes physiques en option", description: "Préparez un QR unique et gérez le remplacement d’une carte perdue." },
] as const;

export const landingStats = [
  { value: "20 %", text: "de vos clients fidèles peuvent générer jusqu’à 80 % de votre chiffre d’affaires" },
  { value: "6×", text: "moins cher de fidéliser un client que d’en conquérir un nouveau" },
  { value: "5 min", text: "pour lancer votre programme, sans matériel ni application" },
  { value: "0", text: "application à télécharger pour vos clients : un QR code suffit" },
] as const;
export const statsNote = "Ordres de grandeur courants (principe de Pareto et études marketing), à titre indicatif. Ils ne constituent pas une promesse de résultat pour votre commerce.";
