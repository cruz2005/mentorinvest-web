"use client";
import LegalDoc from "@/components/LegalDoc";
import { useAppLocale } from "@/components/LocaleProvider";

export default function MentionsLegalesContent() {
  const { locale } = useAppLocale();

  if (locale === "en") {
    return (
      <LegalDoc
        eyebrow="Legal information"
        title="Legal Notice"
        lastUpdated="August 25, 2026"
        intro={
          <p>
            This legal notice applies to the mentorinvest.fr website as well
            as the MentorInvest mobile application (hereinafter the
            &quot;Service&quot;). By accessing the Service, you acknowledge
            that you have read and understood this notice.
          </p>
        }
        sections={[
          {
            heading: "1. Publisher of the site and application",
            content: (
              <>
                <p>
                  The mentorinvest.fr website and the MentorInvest mobile
                  application are published by MentorInvest, a company
                  registered in France.
                </p>
                <ul>
                  <li>Name: MentorInvest</li>
                  <li>Country: France</li>
                  <li>
                    Contact:{" "}
                    <a href="mailto:contact@mentorinvest.fr">
                      contact@mentorinvest.fr
                    </a>
                  </li>
                </ul>
                <p>
                  Full registration details (legal form, SIREN/SIRET number,
                  registered office address, share capital) will be
                  published on this page once the company&apos;s
                  registration process is complete.
                </p>
              </>
            ),
          },
          {
            heading: "2. Publication director",
            content: (
              <p>
                Publication of the site and application is overseen by
                MentorInvest&apos;s legal representative. For any question
                regarding published content, you can contact us at{" "}
                <a href="mailto:contact@mentorinvest.fr">
                  contact@mentorinvest.fr
                </a>
                .
              </p>
            ),
          },
          {
            heading: "3. Hosting",
            content: (
              <>
                <h3>Website hosting</h3>
                <p>
                  The mentorinvest.fr website is hosted by Vercel Inc., 340 S
                  Lemon Ave #4133, Walnut, CA 91789, United States. For more
                  information on Vercel&apos;s infrastructure, see their
                  public documentation.
                </p>
                <h3>Data hosting</h3>
                <p>
                  User data (accounts, preferences, waitlist entries) is
                  hosted and managed via Supabase Inc., on secure cloud
                  infrastructure. Details on how this data is processed are
                  set out in our{" "}
                  <a href="/politique-confidentialite">privacy policy</a>.
                </p>
              </>
            ),
          },
          {
            heading: "4. Intellectual property",
            content: (
              <>
                <p>
                  All elements comprising the MentorInvest website and
                  application — text, graphics, logos, icons, audio
                  elements, software, interfaces, databases, site structure,
                  and more broadly all content present — are protected by
                  copyright, trademark law, and more generally by
                  intellectual property law applicable in France and
                  internationally.
                </p>
                <p>
                  These elements are the exclusive property of MentorInvest,
                  unless stated otherwise. Any reproduction, representation,
                  modification, publication, transmission, or alteration, in
                  whole or in part, of the site, the application, or any of
                  their components, by any means and on any medium
                  whatsoever, without MentorInvest&apos;s prior written
                  authorization, is strictly prohibited and constitutes an
                  act of infringement.
                </p>
                <p>
                  The name &quot;MentorInvest,&quot; its logo (the stylized
                  M), and all associated distinctive signs are protected
                  trademarks and assets. Any reproduction or imitation
                  without prior authorization is prohibited.
                </p>
              </>
            ),
          },
          {
            heading: "5. Personal data",
            content: (
              <p>
                MentorInvest collects and processes personal data as part of
                operating the Service (notably when joining the waitlist).
                How this data is collected, used, retained, and protected,
                as well as your rights, are described in detail in our{" "}
                <a href="/politique-confidentialite">privacy policy</a>,
                which forms an integral part of this legal notice.
              </p>
            ),
          },
          {
            heading: "6. Cookies",
            content: (
              <p>
                The mentorinvest.fr website may use cookies strictly
                necessary for its operation, as well as, where applicable,
                audience-measurement cookies. No advertising or third-party
                tracking cookie is set without your prior consent. Details
                on the cookies used and their purposes are set out in the
                &quot;Cookies and Trackers&quot; section of our{" "}
                <a href="/politique-confidentialite">privacy policy</a>.
              </p>
            ),
          },
          {
            heading: "7. Limitation of liability",
            content: (
              <>
                <p>
                  MentorInvest strives to ensure the accuracy and timeliness
                  of the information published on the Service, and reserves
                  the right to correct its content at any time without
                  notice. However, MentorInvest cannot guarantee the
                  accuracy, precision, completeness, or timeliness of the
                  information provided, particularly market data (prices,
                  indices, rates) supplied by third-party sources.
                </p>
                <p>MentorInvest cannot be held liable for:</p>
                <ul>
                  <li>
                    Interruptions, delays, or malfunctions of the Service,
                    whatever the cause;
                  </li>
                  <li>
                    Errors, inaccuracies, or omissions in the market data
                    displayed, which comes from third-party providers and
                    may be subject to a time lag;
                  </li>
                  <li>
                    Direct or indirect damages resulting from access to or
                    use of the Service, including loss of data or profits;
                  </li>
                  <li>
                    Damages resulting from a fraudulent third-party
                    intrusion that alters the information made available on
                    the Service.
                  </li>
                </ul>
                <p>
                  The user acknowledges using the Service at their own sole
                  risk and responsibility.
                </p>
              </>
            ),
          },
          {
            heading: "8. Investment disclaimer",
            content: (
              <>
                <p>
                  MentorInvest is a market information and analysis tool.
                  The content offered on the Service — charts, market data,
                  analyses generated by the Mentor assistant, financial
                  news, economic calendar — is provided for purely
                  informational and educational purposes.
                </p>
                <p>
                  Nothing presented on the Service constitutes, or should be
                  construed as:
                </p>
                <ul>
                  <li>
                    Personalized investment advice within the meaning of
                    applicable regulations;
                  </li>
                  <li>
                    A recommendation to buy, sell, or hold any financial
                    instrument;
                  </li>
                  <li>
                    A solicitation or offer of fund management, brokerage,
                    or financial intermediation services.
                  </li>
                </ul>
                <p>
                  MentorInvest is not a licensed investment advisor, is not
                  an investment services provider, and is not authorized by
                  any financial supervisory authority. Investing in
                  financial instruments involves risk, including the risk
                  of total loss of invested capital. Each user is solely
                  responsible for their investment decisions and is
                  encouraged to consult a licensed financial advisor before
                  making any decision.
                </p>
              </>
            ),
          },
          {
            heading: "9. Governing law",
            content: (
              <p>
                This legal notice is governed by French law. For any
                question regarding this notice, you can contact us at{" "}
                <a href="mailto:contact@mentorinvest.fr">
                  contact@mentorinvest.fr
                </a>
                .
              </p>
            ),
          },
        ]}
      />
    );
  }

  return (
    <LegalDoc
      eyebrow="Informations légales"
      title="Mentions légales"
      lastUpdated="25 août 2026"
      intro={
        <p>
          Les présentes mentions légales s&apos;appliquent au site
          mentorinvest.fr ainsi qu&apos;à l&apos;application mobile
          MentorInvest (ci-après « le Service »). En accédant au Service,
          vous reconnaissez avoir pris connaissance des présentes mentions.
        </p>
      }
      sections={[
        {
          heading: "1. Éditeur du site et de l'application",
          content: (
            <>
              <p>
                Le site mentorinvest.fr et l&apos;application mobile
                MentorInvest sont édités par MentorInvest, société immatriculée
                en France.
              </p>
              <ul>
                <li>Dénomination : MentorInvest</li>
                <li>Pays d&apos;implantation : France</li>
                <li>
                  Contact :{" "}
                  <a href="mailto:contact@mentorinvest.fr">
                    contact@mentorinvest.fr
                  </a>
                </li>
              </ul>
              <p>
                Les informations d&apos;immatriculation complètes (forme
                juridique, numéro SIREN/SIRET, adresse du siège social,
                capital social) seront communiquées sur cette page dès la
                finalisation des démarches d&apos;immatriculation de la
                société.
              </p>
            </>
          ),
        },
        {
          heading: "2. Directeur de publication",
          content: (
            <p>
              La direction de la publication du site et de l&apos;application
              est assurée par le représentant légal de MentorInvest. Pour
              toute question relative au contenu publié, vous pouvez
              contacter la rédaction à l&apos;adresse{" "}
              <a href="mailto:contact@mentorinvest.fr">
                contact@mentorinvest.fr
              </a>
              .
            </p>
          ),
        },
        {
          heading: "3. Hébergement",
          content: (
            <>
              <h3>Hébergement du site web</h3>
              <p>
                Le site mentorinvest.fr est hébergé par Vercel Inc., 340 S
                Lemon Ave #4133, Walnut, CA 91789, États-Unis. Pour plus
                d&apos;informations sur l&apos;infrastructure de Vercel,
                consultez leur documentation publique.
              </p>
              <h3>Hébergement des données</h3>
              <p>
                Les données utilisateurs (comptes, préférences, listes
                d&apos;attente) sont hébergées et gérées via Supabase Inc.,
                sur une infrastructure cloud sécurisée. Les modalités de
                traitement de ces données sont détaillées dans notre{" "}
                <a href="/politique-confidentialite">
                  politique de confidentialité
                </a>
                .
              </p>
            </>
          ),
        },
        {
          heading: "4. Propriété intellectuelle",
          content: (
            <>
              <p>
                L&apos;ensemble des éléments composant le site et
                l&apos;application MentorInvest — textes, graphismes, logos,
                icônes, éléments sonores, logiciels, interfaces, bases de
                données, arborescence et plus généralement l&apos;ensemble
                des contenus présents — est protégé par le droit
                d&apos;auteur, le droit des marques et, plus largement, par
                le droit de la propriété intellectuelle applicable en
                France et à l&apos;international.
              </p>
              <p>
                Ces éléments sont la propriété exclusive de MentorInvest,
                sauf mention contraire. Toute reproduction, représentation,
                modification, publication, transmission, dénaturation,
                totale ou partielle, du site, de l&apos;application ou de
                l&apos;un quelconque des éléments qui le composent, par
                quelque procédé que ce soit et sur quelque support que ce
                soit, sans autorisation écrite préalable de MentorInvest,
                est strictement interdite et constitutive d&apos;un délit
                de contrefaçon.
              </p>
              <p>
                Le nom « MentorInvest », son logo (le M stylisé) ainsi que
                l&apos;ensemble des signes distinctifs associés sont des
                marques et éléments protégés. Toute reproduction ou
                imitation sans autorisation préalable est prohibée.
              </p>
            </>
          ),
        },
        {
          heading: "5. Données personnelles",
          content: (
            <p>
              MentorInvest collecte et traite des données personnelles dans
              le cadre du fonctionnement du Service (notamment lors de
              l&apos;inscription à la liste d&apos;attente). Les modalités
              de collecte, d&apos;utilisation, de conservation et de
              protection de ces données, ainsi que les droits dont vous
              disposez, sont décrits en détail dans notre{" "}
              <a href="/politique-confidentialite">
                politique de confidentialité
              </a>
              , qui fait partie intégrante des présentes mentions légales.
            </p>
          ),
        },
        {
          heading: "6. Cookies",
          content: (
            <p>
              Le site mentorinvest.fr peut utiliser des cookies strictement
              nécessaires à son fonctionnement ainsi que, le cas échéant,
              des cookies de mesure d&apos;audience. Aucun cookie
              publicitaire ou de traçage tiers n&apos;est déposé sans votre
              consentement préalable. Le détail des cookies utilisés et
              leurs finalités sont précisés dans la section « Cookies et
              traceurs » de notre{" "}
              <a href="/politique-confidentialite">
                politique de confidentialité
              </a>
              .
            </p>
          ),
        },
        {
          heading: "7. Limitation de responsabilité",
          content: (
            <>
              <p>
                MentorInvest s&apos;efforce d&apos;assurer l&apos;exactitude
                et la mise à jour des informations diffusées sur le Service,
                dont elle se réserve le droit de corriger le contenu à tout
                moment et sans préavis. Toutefois, MentorInvest ne peut
                garantir l&apos;exactitude, la précision, l&apos;exhaustivité
                ou l&apos;actualité des informations mises à disposition,
                notamment les données de marché (cours, indices, taux)
                fournies par des sources tierces.
              </p>
              <p>
                MentorInvest ne saurait être tenue responsable :
              </p>
              <ul>
                <li>
                  Des interruptions, retards, ou dysfonctionnements du
                  Service, quelle qu&apos;en soit la cause ;
                </li>
                <li>
                  Des erreurs, inexactitudes ou omissions dans les données
                  de marché affichées, ces dernières provenant de
                  fournisseurs tiers et pouvant présenter un décalage
                  temporel ;
                </li>
                <li>
                  Des dommages directs ou indirects résultant de
                  l&apos;accès ou de l&apos;utilisation du Service, y
                  compris la perte de données ou de profits ;
                </li>
                <li>
                  Des dommages résultant de l&apos;intrusion frauduleuse
                  d&apos;un tiers ayant entraîné une modification des
                  informations mises à disposition sur le Service.
                </li>
              </ul>
              <p>
                L&apos;utilisateur reconnaît utiliser le Service sous sa
                seule responsabilité.
              </p>
            </>
          ),
        },
        {
          heading: "8. Avertissement sur les investissements",
          content: (
            <>
              <p>
                MentorInvest est un outil d&apos;information et
                d&apos;analyse de marché. Le contenu proposé sur le Service
                — graphiques, données de marché, analyses générées par
                l&apos;assistant Mentor, actualités financières, calendrier
                économique — est fourni à titre purement informatif et
                pédagogique.
              </p>
              <p>
                Rien de ce qui est présenté sur le Service ne constitue, ni
                ne saurait être interprété comme :
              </p>
              <ul>
                <li>
                  Un conseil en investissement personnalisé au sens de la
                  réglementation applicable ;
                </li>
                <li>
                  Une recommandation d&apos;achat, de vente ou de conservation
                  d&apos;un instrument financier quelconque ;
                </li>
                <li>
                  Une sollicitation ou une offre de services de gestion de
                  fonds, de courtage ou d&apos;intermédiation financière.
                </li>
              </ul>
              <p>
                MentorInvest n&apos;est pas un conseiller en investissement
                financier (CIF), n&apos;est pas un prestataire de services
                d&apos;investissement (PSI) et n&apos;est agréé par aucune
                autorité de supervision financière. Les investissements en
                instruments financiers comportent des risques, y compris un
                risque de perte totale du capital investi. Chaque
                utilisateur est seul responsable de ses décisions
                d&apos;investissement et est invité à consulter un
                conseiller financier agréé avant toute prise de décision.
              </p>
            </>
          ),
        },
        {
          heading: "9. Droit applicable",
          content: (
            <p>
              Les présentes mentions légales sont soumises au droit
              français. Pour toute question relative à ces mentions, vous
              pouvez nous contacter à{" "}
              <a href="mailto:contact@mentorinvest.fr">
                contact@mentorinvest.fr
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
