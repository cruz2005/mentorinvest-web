"use client";
import LegalDoc from "@/components/LegalDoc";
import { useAppLocale } from "@/components/LocaleProvider";

export default function PolitiqueConfidentialiteContent() {
  const { locale } = useAppLocale();

  if (locale === "en") {
    return (
      <LegalDoc
        eyebrow="Data protection"
        title="Privacy Policy"
        lastUpdated="August 25, 2026"
        intro={
          <p>
            MentorInvest places great importance on protecting your personal
            data. In line with the General Data Protection Regulation
            (GDPR), this policy describes what data we collect, why, how we
            protect it, and what your rights are.
          </p>
        }
        sections={[
          {
            heading: "1. Data controller",
            content: (
              <p>
                The data controller for personal data collected via the
                mentorinvest.fr website and the MentorInvest application is
                MentorInvest, a company based in France. For any question
                regarding your personal data, you can contact us at{" "}
                <a href="mailto:contact@mentorinvest.fr">
                  contact@mentorinvest.fr
                </a>
                .
              </p>
            ),
          },
          {
            heading: "2. Data we collect",
            content: (
              <>
                <h3>Sign-up data</h3>
                <p>
                  When you join the waitlist or create an account, we
                  collect your email address and, where applicable, your
                  usage preferences (tracked assets, preferred language,
                  notification settings).
                </p>
                <h3>Browsing data</h3>
                <p>
                  While you browse the site or use the app, we may
                  automatically collect certain technical data: IP address,
                  device and browser type, pages viewed, visit duration, and
                  anonymized usage statistics that help us improve the
                  Service.
                </p>
                <h3>What we don&apos;t collect</h3>
                <p>
                  MentorInvest never collects banking or payment data
                  directly: transactions related to paid subscriptions are
                  processed by a certified third-party payment provider,
                  which never shares your full banking details with us.
                </p>
              </>
            ),
          },
          {
            heading: "3. Purposes and legal basis for processing",
            content: (
              <table>
                <thead>
                  <tr>
                    <th>Purpose</th>
                    <th>Legal basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Managing the waitlist and user account</td>
                    <td>Pre-contractual / contractual performance</td>
                  </tr>
                  <tr>
                    <td>Sending information about the launch and early adopter offers</td>
                    <td>Consent</td>
                  </tr>
                  <tr>
                    <td>Improving the Service and audience measurement</td>
                    <td>Legitimate interest</td>
                  </tr>
                  <tr>
                    <td>Security and fraud prevention</td>
                    <td>Legitimate interest</td>
                  </tr>
                  <tr>
                    <td>Compliance with legal and accounting obligations</td>
                    <td>Legal obligation</td>
                  </tr>
                </tbody>
              </table>
            ),
          },
          {
            heading: "4. Data retention period",
            content: (
              <p>
                Your sign-up data is retained for as long as you use the
                Service, then archived or deleted within 3 years of your
                last interaction with MentorInvest, unless a longer legal
                retention period applies. Data collected as part of the
                waitlist is retained until the Service launches or until you
                request its deletion, whichever comes first.
              </p>
            ),
          },
          {
            heading: "5. Data sharing",
            content: (
              <>
                <p>
                  Your personal data is never sold, rented, or shared with
                  third parties for commercial purposes.
                </p>
                <p>
                  It may be shared with technical subprocessors strictly
                  necessary for operating the Service (hosting, email
                  delivery, payment), which act on our instructions and are
                  contractually bound to provide a level of protection
                  equivalent to that required by the GDPR.
                </p>
              </>
            ),
          },
          {
            heading: "6. Transfers outside the European Union",
            content: (
              <p>
                The mentorinvest.fr website is hosted by Vercel Inc. and
                user data is managed via Supabase Inc., two providers whose
                infrastructure may involve processing data outside the
                European Union (notably in the United States). These
                transfers are governed by appropriate safeguards recognized
                under the GDPR, such as the European Commission&apos;s
                standard contractual clauses, to ensure an adequate level of
                protection for your data.
              </p>
            ),
          },
          {
            heading: "7. Cookies and trackers",
            content: (
              <>
                <p>
                  The mentorinvest.fr website uses cookies strictly
                  necessary for its operation (for example, to remember your
                  display preferences). These cookies do not require your
                  prior consent, in accordance with applicable regulations.
                </p>
                <p>
                  We may also use audience-measurement cookies to understand
                  how the site is used and to improve it. No advertising or
                  commercial-tracking cookie is set without your explicit
                  consent, which you can withdraw at any time.
                </p>
              </>
            ),
          },
          {
            heading: "8. Your rights",
            content: (
              <>
                <p>
                  In accordance with the GDPR, you have the following rights
                  over your personal data:
                </p>
                <ul>
                  <li>
                    <strong>Right of access</strong> — obtain confirmation
                    that your data is being processed and receive a copy of
                    it;
                  </li>
                  <li>
                    <strong>Right to rectification</strong> — correct
                    inaccurate or incomplete data;
                  </li>
                  <li>
                    <strong>Right to erasure</strong> — request the deletion
                    of your data in the cases provided by law;
                  </li>
                  <li>
                    <strong>Right to data portability</strong> — receive
                    your data in a structured, commonly used format;
                  </li>
                  <li>
                    <strong>Right to object</strong> — object, on legitimate
                    grounds, to the processing of your data;
                  </li>
                  <li>
                    <strong>Right to restriction of processing</strong> —
                    request the temporary suspension of processing.
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, contact us at{" "}
                  <a href="mailto:contact@mentorinvest.fr">
                    contact@mentorinvest.fr
                  </a>
                  . We are committed to responding within one month at most.
                </p>
              </>
            ),
          },
          {
            heading: "9. Data security",
            content: (
              <p>
                MentorInvest implements appropriate technical and
                organizational measures (encryption of data in transit,
                access control, secure hosting) to protect your personal
                data against loss, unauthorized access, disclosure, or
                alteration.
              </p>
            ),
          },
          {
            heading: "10. Contact and complaints",
            content: (
              <>
                <p>
                  For any question regarding this privacy policy or the
                  processing of your personal data, you can contact us at{" "}
                  <a href="mailto:contact@mentorinvest.fr">
                    contact@mentorinvest.fr
                  </a>
                  .
                </p>
                <p>
                  If you believe your rights are not being respected, you
                  can file a complaint with the competent supervisory
                  authority in France, the Commission Nationale de
                  l&apos;Informatique et des Libertés (CNIL), via{" "}
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
                    www.cnil.fr
                  </a>
                  .
                </p>
              </>
            ),
          },
        ]}
      />
    );
  }

  return (
    <LegalDoc
      eyebrow="Protection des données"
      title="Politique de confidentialité"
      lastUpdated="25 août 2026"
      intro={
        <p>
          MentorInvest attache une importance particulière à la protection
          de tes données personnelles. Cette politique décrit, conformément
          au Règlement Général sur la Protection des Données (RGPD), quelles
          données nous collectons, pourquoi, comment nous les protégeons et
          quels sont tes droits.
        </p>
      }
      sections={[
        {
          heading: "1. Responsable du traitement",
          content: (
            <p>
              Le responsable du traitement des données personnelles
              collectées via le site mentorinvest.fr et l&apos;application
              MentorInvest est MentorInvest, société implantée en France.
              Pour toute question relative à tes données personnelles, tu
              peux nous contacter à l&apos;adresse{" "}
              <a href="mailto:contact@mentorinvest.fr">
                contact@mentorinvest.fr
              </a>
              .
            </p>
          ),
        },
        {
          heading: "2. Données collectées",
          content: (
            <>
              <h3>Données d&apos;inscription</h3>
              <p>
                Lorsque tu t&apos;inscris sur la liste d&apos;attente ou
                crées un compte, nous collectons ton adresse email et, le
                cas échéant, tes préférences d&apos;utilisation (actifs
                suivis, langue préférée, notifications souhaitées).
              </p>
              <h3>Données de navigation</h3>
              <p>
                Lors de ta navigation sur le site ou de ton utilisation de
                l&apos;application, nous pouvons collecter automatiquement
                certaines données techniques : adresse IP, type
                d&apos;appareil et de navigateur, pages consultées, durée de
                visite, et statistiques d&apos;usage anonymisées permettant
                d&apos;améliorer le Service.
              </p>
              <h3>Ce que nous ne collectons pas</h3>
              <p>
                MentorInvest ne collecte aucune donnée bancaire ou de
                paiement directement : les transactions liées aux
                abonnements payants sont traitées par un prestataire de
                paiement tiers certifié, qui ne nous transmet jamais tes
                coordonnées bancaires complètes.
              </p>
            </>
          ),
        },
        {
          heading: "3. Finalités et base légale du traitement",
          content: (
            <table>
              <thead>
                <tr>
                  <th>Finalité</th>
                  <th>Base légale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gestion de la liste d&apos;attente et du compte utilisateur</td>
                  <td>Exécution précontractuelle / contractuelle</td>
                </tr>
                <tr>
                  <td>Envoi d&apos;informations sur le lancement, les offres early adopter</td>
                  <td>Consentement</td>
                </tr>
                <tr>
                  <td>Amélioration du Service et mesure d&apos;audience</td>
                  <td>Intérêt légitime</td>
                </tr>
                <tr>
                  <td>Sécurité, prévention de la fraude</td>
                  <td>Intérêt légitime</td>
                </tr>
                <tr>
                  <td>Respect d&apos;obligations légales et comptables</td>
                  <td>Obligation légale</td>
                </tr>
              </tbody>
            </table>
          ),
        },
        {
          heading: "4. Durée de conservation",
          content: (
            <p>
              Tes données d&apos;inscription sont conservées pendant toute
              la durée d&apos;utilisation du Service, puis archivées ou
              supprimées dans un délai de 3 ans à compter de ta dernière
              interaction avec MentorInvest, sauf obligation légale de
              conservation plus longue. Les données collectées dans le
              cadre de la liste d&apos;attente sont conservées jusqu&apos;au
              lancement du Service ou jusqu&apos;à ta demande de
              suppression, selon l&apos;événement le plus rapproché.
            </p>
          ),
        },
        {
          heading: "5. Partage des données",
          content: (
            <>
              <p>
                Tes données personnelles ne sont ni vendues, ni louées, ni
                partagées avec des tiers à des fins commerciales.
              </p>
              <p>
                Elles peuvent être transmises à des sous-traitants
                techniques strictement nécessaires au fonctionnement du
                Service (hébergement, envoi d&apos;emails, paiement), qui
                agissent sur nos instructions et sont contractuellement
                tenus d&apos;assurer un niveau de protection équivalent à
                celui imposé par le RGPD.
              </p>
            </>
          ),
        },
        {
          heading: "6. Transferts hors Union européenne",
          content: (
            <p>
              Le site mentorinvest.fr est hébergé par Vercel Inc. et les
              données utilisateurs sont gérées via Supabase Inc., deux
              prestataires dont l&apos;infrastructure peut impliquer un
              traitement de données en dehors de l&apos;Union européenne
              (notamment aux États-Unis). Ces transferts sont encadrés par
              des garanties appropriées reconnues par le RGPD, telles que
              les clauses contractuelles types de la Commission européenne,
              afin d&apos;assurer un niveau de protection adéquat de tes
              données.
            </p>
          ),
        },
        {
          heading: "7. Cookies et traceurs",
          content: (
            <>
              <p>
                Le site mentorinvest.fr utilise des cookies strictement
                nécessaires à son fonctionnement (par exemple pour retenir
                tes préférences d&apos;affichage). Ces cookies ne
                nécessitent pas ton consentement préalable, conformément à
                la réglementation applicable.
              </p>
              <p>
                Nous pouvons également utiliser des cookies de mesure
                d&apos;audience afin de comprendre comment le site est
                utilisé et l&apos;améliorer. Aucun cookie publicitaire ni de
                traçage à des fins de ciblage commercial n&apos;est déposé
                sans ton consentement explicite, que tu peux retirer à tout
                moment.
              </p>
            </>
          ),
        },
        {
          heading: "8. Tes droits",
          content: (
            <>
              <p>
                Conformément au RGPD, tu disposes des droits suivants sur
                tes données personnelles :
              </p>
              <ul>
                <li>
                  <strong>Droit d&apos;accès</strong> — obtenir la
                  confirmation que tes données sont traitées et en obtenir
                  une copie ;
                </li>
                <li>
                  <strong>Droit de rectification</strong> — corriger des
                  données inexactes ou incomplètes ;
                </li>
                <li>
                  <strong>Droit à l&apos;effacement</strong> — demander la
                  suppression de tes données dans les cas prévus par la loi ;
                </li>
                <li>
                  <strong>Droit à la portabilité</strong> — recevoir tes
                  données dans un format structuré et couramment utilisé ;
                </li>
                <li>
                  <strong>Droit d&apos;opposition</strong> — t&apos;opposer,
                  pour des motifs légitimes, à un traitement de tes données ;
                </li>
                <li>
                  <strong>Droit à la limitation du traitement</strong> —
                  demander la suspension temporaire d&apos;un traitement.
                </li>
              </ul>
              <p>
                Pour exercer l&apos;un de ces droits, contacte-nous à{" "}
                <a href="mailto:contact@mentorinvest.fr">
                  contact@mentorinvest.fr
                </a>
                . Nous nous engageons à répondre dans un délai maximal
                d&apos;un mois.
              </p>
            </>
          ),
        },
        {
          heading: "9. Sécurité des données",
          content: (
            <p>
              MentorInvest met en œuvre des mesures techniques et
              organisationnelles appropriées (chiffrement des données en
              transit, contrôle d&apos;accès, hébergement sécurisé) afin de
              protéger tes données personnelles contre toute perte, accès
              non autorisé, divulgation ou altération.
            </p>
          ),
        },
        {
          heading: "10. Contact et réclamation",
          content: (
            <>
              <p>
                Pour toute question relative à cette politique de
                confidentialité ou au traitement de tes données
                personnelles, tu peux nous contacter à l&apos;adresse{" "}
                <a href="mailto:contact@mentorinvest.fr">
                  contact@mentorinvest.fr
                </a>
                .
              </p>
              <p>
                Si tu estimes que tes droits ne sont pas respectés, tu peux
                introduire une réclamation auprès de l&apos;autorité de
                contrôle compétente en France, la Commission Nationale de
                l&apos;Informatique et des Libertés (CNIL), via le site{" "}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
                  www.cnil.fr
                </a>
                .
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
