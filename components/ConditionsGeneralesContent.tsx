"use client";
import LegalDoc from "@/components/LegalDoc";
import { useAppLocale } from "@/components/LocaleProvider";

export default function ConditionsGeneralesContent() {
  const { locale } = useAppLocale();

  if (locale === "en") {
    return (
      <LegalDoc
        eyebrow="Terms"
        title="Terms of Service"
        lastUpdated="August 25, 2026"
        intro={
          <p>
            These Terms of Service (&quot;Terms&quot;) govern access to and
            use of the mentorinvest.fr website and the MentorInvest mobile
            application (the &quot;Service&quot;). By creating an account or
            using the Service, you accept these Terms without reservation.
          </p>
        }
        sections={[
          {
            heading: "Article 1 — Purpose and scope",
            content: (
              <p>
                These Terms set out the terms and conditions under which
                MentorInvest makes its Service available to users, as well
                as the rights and obligations of the parties in this
                context. They apply to anyone accessing the site or the
                application, whether or not they hold a user account.
              </p>
            ),
          },
          {
            heading: "Article 2 — Description of the Service",
            content: (
              <>
                <p>
                  MentorInvest is a mobile market-analysis application
                  designed for everyday investors. The Service notably
                  provides access to:
                </p>
                <ul>
                  <li>
                    Real-time market charts (cryptocurrencies, stocks,
                    forex, indices, commodities);
                  </li>
                  <li>
                    An AI assistant, &quot;Mentor,&quot; designed to help
                    with market analysis;
                  </li>
                  <li>
                    A 3D Globe of world markets, offering three viewing
                    modes (Normal, Live, Macro);
                  </li>
                  <li>Financial news, automatically translated into 8 languages;</li>
                  <li>An economic calendar of market events;</li>
                  <li>A customizable watchlist;</li>
                  <li>Configurable price alerts.</li>
                </ul>
                <p>
                  MentorInvest reserves the right to evolve, add, or remove
                  features of the Service at any time, in order to improve
                  its quality or to comply with regulatory or technical
                  developments.
                </p>
              </>
            ),
          },
          {
            heading: "Article 3 — Registration and user account",
            content: (
              <>
                <p>
                  Access to certain features of the Service requires
                  creating a user account linked to a valid email address.
                  You agree to provide accurate, up-to-date information when
                  registering and to keep it current.
                </p>
                <p>
                  You are solely responsible for keeping your login
                  credentials confidential and for all activity carried out
                  through your account. Any suspected unauthorized use of
                  your account must be reported immediately to{" "}
                  <a href="mailto:contact@mentorinvest.fr">
                    contact@mentorinvest.fr
                  </a>
                  .
                </p>
                <p>
                  MentorInvest reserves the right to suspend or delete any
                  account in the event of a breach of these Terms, or
                  fraudulent or abusive use of the Service.
                </p>
              </>
            ),
          },
          {
            heading: "Article 4 — Pricing plans and billing",
            content: (
              <>
                <p>MentorInvest offers three subscription plans:</p>
                <table>
                  <thead>
                    <tr>
                      <th>Plan</th>
                      <th>Price</th>
                      <th>Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Free</td>
                      <td>€0</td>
                      <td>Essential features of the Service</td>
                    </tr>
                    <tr>
                      <td>Analyst</td>
                      <td>€19.99 / month</td>
                      <td>Advanced analysis features</td>
                    </tr>
                    <tr>
                      <td>Pro</td>
                      <td>€29.99 / month</td>
                      <td>Full, unlimited access to the Service</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  Paid subscriptions are billed on a monthly cycle and renew
                  automatically unless canceled before the renewal date.
                  Prices are shown inclusive of all taxes and may be
                  revised; any price change will be communicated to
                  subscribed users with reasonable notice before it takes
                  effect, and will not apply to periods already billed.
                </p>
                <p>
                  Subscription payments are processed by a secure
                  third-party payment provider. MentorInvest never stores
                  your full banking details.
                </p>
              </>
            ),
          },
          {
            heading: "Article 5 — Cancellation and refunds",
            content: (
              <>
                <p>
                  You can cancel your subscription at any time from your
                  account settings or by contacting{" "}
                  <a href="mailto:contact@mentorinvest.fr">
                    contact@mentorinvest.fr
                  </a>
                  . Cancellation takes effect at the end of the current
                  billing period: access to paid features remains active
                  until that date, with no further renewal.
                </p>
                <p>
                  Except where otherwise required by law in your
                  jurisdiction (notably the right of withdrawal provided
                  under French law for distance contracts), amounts already
                  paid for a subscription period that has begun are
                  non-refundable. MentorInvest nonetheless reserves the
                  right to review, on a case-by-case basis, any exceptional
                  refund request sent to{" "}
                  <a href="mailto:contact@mentorinvest.fr">
                    contact@mentorinvest.fr
                  </a>
                  .
                </p>
              </>
            ),
          },
          {
            heading: "Article 6 — Intellectual property",
            content: (
              <p>
                All content, trademarks, logos, interfaces, features, and
                technologies making up the Service are the exclusive
                property of MentorInvest or its licensors, and are protected
                by intellectual property law. Using the Service confers no
                ownership rights over these elements. Any unauthorized
                reproduction, extraction, or reuse, in whole or in part, is
                strictly prohibited.
              </p>
            ),
          },
          {
            heading: "Article 7 — Liability and limitations",
            content: (
              <>
                <p>
                  MentorInvest uses all reasonable means to ensure the
                  availability, reliability, and security of the Service,
                  without however guaranteeing uninterrupted availability or
                  a complete absence of errors.
                </p>
                <p>
                  To the extent permitted by law, MentorInvest cannot be
                  held liable for indirect damages (loss of profits,
                  opportunity, or data) resulting from the use of, or
                  inability to use, the Service. In any event,
                  MentorInvest&apos;s total liability, for all claims
                  combined, is limited to the amount actually paid by the
                  user for their subscription over the preceding twelve
                  months.
                </p>
              </>
            ),
          },
          {
            heading: "Article 8 — MentorInvest is not a financial advisor",
            content: (
              <>
                <p>
                  MentorInvest is a market information and analysis tool.
                  Neither the Service, nor the Mentor assistant, nor any
                  content displayed (charts, indicators, news, economic
                  calendar) constitutes personalized investment advice, a
                  recommendation to buy or sell, or an inducement to carry
                  out any transaction in a financial instrument.
                </p>
                <p>
                  MentorInvest is not a licensed investment advisor or an
                  investment services provider, and is not authorized by any
                  financial supervisory authority (including the AMF).
                  Investment decisions made based on information provided by
                  the Service are the sole responsibility of the user, who
                  is encouraged to consult a licensed financial advisor
                  before making any decision. Investing in financial
                  instruments carries a risk of capital loss, which may
                  extend to the total loss of the amounts invested.
                </p>
              </>
            ),
          },
          {
            heading: "Article 9 — Personal data",
            content: (
              <p>
                The processing of personal data carried out as part of
                using the Service is described in detail in our{" "}
                <a href="/politique-confidentialite">privacy policy</a>,
                which forms an integral part of these Terms.
              </p>
            ),
          },
          {
            heading: "Article 10 — Changes to these Terms",
            content: (
              <p>
                MentorInvest reserves the right to modify these Terms at any
                time, notably to reflect legal, regulatory, or functional
                changes to the Service. Users will be informed of any
                material change by email or in-app notification, with
                reasonable notice before it takes effect. Continued use of
                the Service after that date constitutes acceptance of the
                revised Terms.
              </p>
            ),
          },
          {
            heading: "Article 11 — Governing law and jurisdiction",
            content: (
              <p>
                These Terms are governed by French law. In the event of a
                dispute concerning their interpretation or performance, and
                failing an amicable resolution, the French courts shall
                have exclusive jurisdiction, subject to applicable mandatory
                rules, notably those protecting consumers.
              </p>
            ),
          },
        ]}
      />
    );
  }

  return (
    <LegalDoc
      eyebrow="Conditions générales"
      title="Conditions générales d'utilisation"
      lastUpdated="25 août 2026"
      intro={
        <p>
          Les présentes conditions générales d&apos;utilisation (« CGU »)
          régissent l&apos;accès et l&apos;utilisation du site
          mentorinvest.fr et de l&apos;application mobile MentorInvest (« le
          Service »). En créant un compte ou en utilisant le Service, tu
          acceptes sans réserve les présentes CGU.
        </p>
      }
      sections={[
        {
          heading: "Article 1 — Objet et champ d'application",
          content: (
            <p>
              Les présentes CGU ont pour objet de définir les modalités et
              conditions dans lesquelles MentorInvest met son Service à
              disposition des utilisateurs, ainsi que les droits et
              obligations des parties dans ce cadre. Elles s&apos;appliquent
              à toute personne accédant au site ou à l&apos;application,
              qu&apos;elle dispose ou non d&apos;un compte utilisateur.
            </p>
          ),
        },
        {
          heading: "Article 2 — Description du service",
          content: (
            <>
              <p>
                MentorInvest est une application mobile d&apos;analyse de
                marché destinée aux investisseurs particuliers. Le Service
                donne accès notamment à :
              </p>
              <ul>
                <li>
                  Des graphiques de marché en temps réel (cryptomonnaies,
                  actions, forex, indices, matières premières) ;
                </li>
                <li>
                  Un assistant intelligence artificielle, « Mentor »,
                  destiné à aider à l&apos;analyse des marchés ;
                </li>
                <li>
                  Un Globe 3D des marchés mondiaux, proposant trois modes
                  de visualisation (Normal, Live, Macro) ;
                </li>
                <li>
                  Des actualités financières, traduites automatiquement en
                  8 langues ;
                </li>
                <li>Un calendrier économique des événements de marché ;</li>
                <li>Une watchlist personnalisable ;</li>
                <li>Des alertes de prix configurables.</li>
              </ul>
              <p>
                MentorInvest se réserve le droit de faire évoluer, ajouter
                ou retirer des fonctionnalités du Service à tout moment,
                afin d&apos;en améliorer la qualité ou de se conformer à
                des évolutions réglementaires ou techniques.
              </p>
            </>
          ),
        },
        {
          heading: "Article 3 — Inscription et compte utilisateur",
          content: (
            <>
              <p>
                L&apos;accès à certaines fonctionnalités du Service
                nécessite la création d&apos;un compte utilisateur, associé
                à une adresse email valide. Tu t&apos;engages à fournir des
                informations exactes et à jour lors de ton inscription et à
                les maintenir à jour.
              </p>
              <p>
                Tu es seul responsable de la confidentialité de tes
                identifiants de connexion et de toute activité réalisée
                depuis ton compte. Toute suspicion d&apos;utilisation non
                autorisée de ton compte doit être signalée sans délai à{" "}
                <a href="mailto:contact@mentorinvest.fr">
                  contact@mentorinvest.fr
                </a>
                .
              </p>
              <p>
                MentorInvest se réserve le droit de suspendre ou de
                supprimer tout compte en cas de violation des présentes
                CGU, d&apos;usage frauduleux ou abusif du Service.
              </p>
            </>
          ),
        },
        {
          heading: "Article 4 — Plans tarifaires et facturation",
          content: (
            <>
              <p>MentorInvest propose trois formules d&apos;abonnement :</p>
              <table>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Tarif</th>
                    <th>Accès</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gratuit</td>
                    <td>0 €</td>
                    <td>Fonctionnalités essentielles du Service</td>
                  </tr>
                  <tr>
                    <td>Analyste</td>
                    <td>19,99 € / mois</td>
                    <td>Fonctionnalités avancées d&apos;analyse</td>
                  </tr>
                  <tr>
                    <td>Pro</td>
                    <td>29,99 € / mois</td>
                    <td>Accès complet au Service, sans limitation</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Les abonnements payants sont facturés par cycle mensuel et
                reconduits automatiquement, sauf résiliation avant la date
                de renouvellement. Les tarifs sont indiqués toutes taxes
                comprises et peuvent être révisés ; toute modification
                tarifaire sera communiquée aux utilisateurs abonnés avec un
                préavis raisonnable avant son entrée en vigueur, et ne
                s&apos;appliquera pas aux périodes déjà facturées.
              </p>
              <p>
                Le paiement des abonnements est traité par un prestataire
                de paiement tiers sécurisé. MentorInvest ne stocke à aucun
                moment tes coordonnées bancaires complètes.
              </p>
            </>
          ),
        },
        {
          heading: "Article 5 — Résiliation et remboursement",
          content: (
            <>
              <p>
                Tu peux résilier ton abonnement à tout moment depuis les
                paramètres de ton compte ou en contactant{" "}
                <a href="mailto:contact@mentorinvest.fr">
                  contact@mentorinvest.fr
                </a>
                . La résiliation prend effet à la fin de la période de
                facturation en cours : l&apos;accès aux fonctionnalités
                payantes reste actif jusqu&apos;à cette date, sans
                reconduction ultérieure.
              </p>
              <p>
                Sauf disposition légale contraire applicable dans ta
                juridiction (notamment le droit de rétractation prévu par
                le droit français pour les contrats conclus à distance),
                les sommes déjà versées au titre d&apos;une période
                d&apos;abonnement entamée ne sont pas remboursables.
                MentorInvest se réserve toutefois la possibilité
                d&apos;étudier, au cas par cas, toute demande de
                remboursement exceptionnelle adressée à{" "}
                <a href="mailto:contact@mentorinvest.fr">
                  contact@mentorinvest.fr
                </a>
                .
              </p>
            </>
          ),
        },
        {
          heading: "Article 6 — Propriété intellectuelle",
          content: (
            <p>
              L&apos;ensemble des contenus, marques, logos, interfaces,
              fonctionnalités et technologies composant le Service sont la
              propriété exclusive de MentorInvest ou de ses concédants de
              licence, et sont protégés par le droit de la propriété
              intellectuelle. L&apos;utilisation du Service ne confère
              aucun droit de propriété sur ces éléments. Toute reproduction,
              extraction ou réutilisation non autorisée, totale ou
              partielle, est strictement interdite.
            </p>
          ),
        },
        {
          heading: "Article 7 — Responsabilité et limitations",
          content: (
            <>
              <p>
                MentorInvest met en œuvre tous les moyens raisonnables pour
                assurer la disponibilité, la fiabilité et la sécurité du
                Service, sans toutefois garantir une disponibilité
                ininterrompue ou une absence totale d&apos;erreurs.
              </p>
              <p>
                Dans les limites permises par la loi, la responsabilité de
                MentorInvest ne saurait être engagée au titre de dommages
                indirects (perte de profits, de chance, de données) résultant
                de l&apos;utilisation ou de l&apos;impossibilité
                d&apos;utiliser le Service. La responsabilité totale de
                MentorInvest, tous préjudices confondus, est en tout état de
                cause limitée au montant effectivement versé par
                l&apos;utilisateur au titre de son abonnement au cours des
                douze derniers mois.
              </p>
            </>
          ),
        },
        {
          heading: "Article 8 — MentorInvest n'est pas un conseiller financier",
          content: (
            <>
              <p>
                MentorInvest est un outil d&apos;information et
                d&apos;analyse de marché. Ni le Service, ni l&apos;assistant
                Mentor, ni aucun contenu affiché (graphiques, indicateurs,
                actualités, calendrier économique) ne constitue un conseil
                en investissement personnalisé, une recommandation
                d&apos;achat ou de vente, ni une incitation à réaliser une
                quelconque opération sur un instrument financier.
              </p>
              <p>
                MentorInvest n&apos;est ni un conseiller en investissement
                financier (CIF), ni un prestataire de services
                d&apos;investissement (PSI), et n&apos;est agréée par
                aucune autorité de supervision financière (notamment
                l&apos;AMF). Les décisions d&apos;investissement prises sur
                la base des informations fournies par le Service relèvent de
                la seule responsabilité de l&apos;utilisateur, qui est
                invité à consulter un conseiller financier agréé avant
                toute décision. Les investissements en instruments
                financiers comportent un risque de perte en capital,
                pouvant aller jusqu&apos;à la perte totale des sommes
                investies.
              </p>
            </>
          ),
        },
        {
          heading: "Article 9 — Données personnelles",
          content: (
            <p>
              Le traitement des données personnelles réalisé dans le cadre
              de l&apos;utilisation du Service est décrit en détail dans
              notre{" "}
              <a href="/politique-confidentialite">
                politique de confidentialité
              </a>
              , qui fait partie intégrante des présentes CGU.
            </p>
          ),
        },
        {
          heading: "Article 10 — Modification des présentes CGU",
          content: (
            <p>
              MentorInvest se réserve le droit de modifier les présentes
              CGU à tout moment, notamment pour tenir compte
              d&apos;évolutions légales, réglementaires ou fonctionnelles
              du Service. Les utilisateurs seront informés de toute
              modification substantielle par email ou notification au sein
              du Service, avec un préavis raisonnable avant son entrée en
              vigueur. La poursuite de l&apos;utilisation du Service après
              cette date vaut acceptation des CGU modifiées.
            </p>
          ),
        },
        {
          heading: "Article 11 — Droit applicable et juridiction compétente",
          content: (
            <p>
              Les présentes CGU sont régies par le droit français. En cas
              de litige relatif à leur interprétation ou à leur exécution,
              et à défaut de résolution amiable, les tribunaux français
              seront seuls compétents, sous réserve des règles
              d&apos;ordre public applicables, notamment celles protégeant
              les consommateurs.
            </p>
          ),
        },
      ]}
    />
  );
}
