import PartTime from "../assets/learningnuggets/part-time.png";
import Divorce from "../assets/learningnuggets/divorce.png";
import BuyHouse from "../assets/learningnuggets/buy-house.png";
import TaxSaving from "../assets/learningnuggets/tax-saving.png";
import NaturalDesasters from "../assets/learningnuggets/natural-desasters.png";
import Robbery from "../assets/learningnuggets/robbery.png";
import Education from "../assets/learningnuggets/education.png";
import Debt from "../assets/learningnuggets/debt.png";
import Trophy from "../assets/learningnuggets/trophy.png";

const Nuggets = [
  {
    id: "PillarpaymentPensiongapParttime",
    title: "Deine Vorsorge weist Lücken auf",
    content:
      "Teilzeitpensum verursacht Vorsorgelücken. Prüfe, wie du diese mit Einzahlungen in die 2. und 3. Säule schliessen kannst.",
    icon: PartTime,
    isShown: true,
  },
  {
    id: "PillarpaymentPensiongapDivorce",
    title: "Schliesse die Lücke nach Scheidung",
    content:
      "Eine Scheidung hat einen starken Einfluss auf deine Vorsorgesitutation. Prüfe, wie du diese mit Einzahlungen in die 2. und 3. Säule schliessen kannst.",
    icon: Divorce,
    isShown: true,
  },
  {
    id: "PillarpaymentPensiongapBuyhouse",
    title: "Vorbezug verursacht Vorsorgelücken",
    content:
      "Schliesse Lücken in deiner 2. und 3. Säule. Zu tiefe Renten können dazu führen, dass du dein Haus verkaufen musst.",
    icon: BuyHouse,
    isShown: true,
  },
  {
    id: "PillarpaymentTaxsavingLotofmoney",
    title: "Spare bei den Steuern",
    content:
      "Du hast viel Geld auf deinem Konto gesammelt. Mit Einzahlungen in die 2. oder 3. Säule hättest du im Spiel bis zu CHF 17k Steuern sparen können.",
    icon: TaxSaving,
    isShown: true,
  },
  {
    id: "InsuranceRobbery",
    title: "Schütze dich vor Diebstahl",
    content:
      "Diebstähle können grosse finanzielle Verluste verursachen. Schliesse eine Hausratversicherung ab, um geschützt zu sein.",
    icon: Robbery,
    isShown: true,
  },
  {
    id: "InsuranceFlooding",
    title: "Schütze dich vor Naturereignissen",
    content:
      "Überschwemmungen passieren unvorhergesehen und können grosse finanzielle Verluste verursachen. Schliesse eine Gebäudeversicherung ab, um geschützt zu sein.",
    icon: NaturalDesasters,
    isShown: true,
  },
  {
    id: "EducationSalaryincrease",
    title: "Verbessere dein Einkommen",
    content:
      "Um in diesem Spiel ein höheres Einkommen zu erzielen, mach doch mal eine Weiterbildung.",
    icon: Education,
    isShown: true,
  },
  {
    id: "FinancemanagementDebtoverload",
    title: "Du hast dich zu hoch verschuldet",
    content:
      "Achte auf deine Finanzen und verschulde dich nicht. Erstelle ein persönliches Budget, damit du weisst welche Investitionen noch warten müssen.",
    icon: Debt,
    isShown: true,
  },
  {
    id: "DidEverythingRight",
    title: "Du warst grossartig",
    content:
      "Du hast durch Einzahlungen in die 2. und 3. Säule optimal vorgesorgt. \n" +
      "Du hast dein Hab und Gut versichert. \n" +
      "Du hast dein berufliches Potential ausgeschöpft. \n" +
      "Du hast deine Finanzen im Griff.",
    icon: Trophy,
    isShown: true,
  },
];

export default Nuggets;
