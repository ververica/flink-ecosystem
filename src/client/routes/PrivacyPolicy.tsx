import React, { FC } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { MainCard } from "client/components/MainCard";
import styled from "styled-components/macro";

const LegalCard = styled(MainCard)`
  ul:not(last-child) {
    margin-bottom: 1rem;
  }
`;

export const PrivacyPolicy: FC<Props> = props => {
  return (
    <LegalCard>
      <h1>Data Privacy Policy</h1>
      <p>
        We, Ververica GmbH (hereinafter &quot;we&quot; or &quot;Ververica&quot;)
        are pleased about your interest in our company.
      </p>
      <p>
        We take the protection of your personal data and their confidential
        treatment very seriously. The processing of your personal data takes
        place exclusively within the framework of the legal provisions of the
        data protection law of the European Union, in particular the General
        Data Protection Regulation (hereinafter &quot;GDPR&quot;) and further
        applicable regulations.
      </p>
      <p>
        With this privacy policy we inform you about the processing of your
        personal data on our website flink-packages.org (the
        &ldquo;website&rdquo;) and about your privacy rights.
      </p>
      <ol>
        <li>
          <strong>
            Name and contact details of the controller as well as operational
            data protection officer
          </strong>
          <p>
            This data privacy statement shall apply to data processing
            activities by the following controller:
          </p>
          <address>
            Ververica GmbH
            <br />
            Invalidenstrasse 115
            <br />
            10115 Berlin Germany
            <br />
            email: info@ververica.com,
            <br />
            phone: +49 30-54907256
            <br />
          </address>
          <p>
            Managing Director: Timothy Alexander Steinert, Yip Park Tung Jason,
            Ji (Tony) Cheng
          </p>
          <p>
            The operational data protection officer can be reached as via the
            address mentioned above c/o Kai Gerecke
          </p>
          <address>
            email: dataprotection@ververica.com
            <br />
            phone: +49 30-54907256
          </address>
        </li>
        <li>
          <strong>Subject matter of data protection</strong>
          <p>
            The subject matter of data protection is personal data&quot;. This
            means any information relating to an identified or identifiable
            natural person (&lsquo;data subject&rsquo;). These include e.g.
            information such as name, postal address, e-mail address or
            telephone number.
          </p>
          <p>
            Specific information on the personal data processed by us can be
            found below in detail in the data processing operations listed.
          </p>
        </li>
        <li>
          <strong>
            Collection and storage of personal data as well as the nature and
            purpose of their processing
          </strong>

          <ol type="a">
            <li>
              <strong>When visiting the website</strong>
              <p>
                When calling our website, the browser used on your end device
                will automatically send information to the server of our
                website. This information is temporarily stored in a so-called
                log file. The following information is recorded without any
                action on your end and stored for a period of 30 days:
              </p>
              <ul>
                <li>internet protocol address of the requesting computer</li>
                <li>date and time of the access</li>
                <li>name and URL of the file retrieved</li>
                <li>
                  website from which the access takes place (referrer URL)
                </li>
                <li>website that is called via our website</li>
                <li>
                  browser used and, if applicable, the operating system of your
                  computer and the name of your access provider
                </li>
              </ul>
              <p>
                The data mentioned are processed by us for the following
                purposes:
              </p>
              <p></p>
              <ul>
                <li>
                  ensuring smooth establishment of the website&rsquo;s
                  connection
                </li>
                <li>ensuring comfortable use of our website</li>
                <li>evaluation of system safety and stability, as well as</li>
                <li>other administrative purposes</li>
              </ul>
              <p>
                The legal basis for data processing activities shall be
                Article&nbsp;6(1)(1)(f)&nbsp;GDPR. Our legitimate interests
                follow from the purposes listed above for data collection. In no
                case shall we use any collected data for the purpose of drawing
                conclusions about your person.
              </p>
            </li>
            <li>
              <strong>When using our email contact</strong>
              <p>
                If there are any questions, we offer the option of contacting us
                via the provided email address. In such a case, your personal
                data transmitted in the email will be stored.
              </p>
              <p>
                The legal basis for data processing for the purpose of Data
                processing activities for the purpose of contacting is
                Article&nbsp;6(1)(1)(f)&nbsp;GDPR. If the purpose of the contact
                is to conclude a contract, the additional legal basis for the
                processing is Article&nbsp;6(1)(1)(b)&nbsp;GDPR.
              </p>
              <p>
                The personal data collected by us shall be erased upon your
                request.
              </p>
            </li>

            <li>
              <strong>Process of Logging in</strong>
              <p>
                We offer you the option to login to our website with a GitHub
                account. An alternative registration is not possible. You will
                be redirected to the GitHub website where you can log in with
                your existing user data or register by creating a new account.
                This will link your GitHub profile and our service. Ververica
                will not receive your GitHub login credentials. The Service will
                retrieve your public GitHub account information based on a
                temporary access token generated by GitHub upon login.. The
                legal basis for the processing of your data is Art. 6 (1)(1)(b)
                GDPR.
              </p>
              <p>
                We will store your personal data for as long as necessary to
                provide the contractually agreed service.
              </p>
              <p>
                Further information on GitHub and the privacy settings can be
                found in the Privacy Policy and the Terms of Use of GitHub Inc.
                under https://github.com/.
              </p>
            </li>
          </ol>
        </li>
        <li>
          <strong>Transferring data</strong>
          <p>
            We shall only pass on your personal data to third parties
            (recipients) if we are entitled to do so under the provisions of
            data protection law. Below we inform you about the circumstances in
            which this may be the case: We can pass on your personal data to
            third parties (recipients), if:
          </p>
          <ul>
            <li>
              you have explicitly given consent to such for one or more specific
              purposes (Article&nbsp;6(1)(1)(a)&nbsp;GDPR);
            </li>
            <li>
              processing is necessary for the performance of a contract to which
              you are a party or in order to take steps at your request prior to
              entering into a contract (Article&nbsp;6(1)(1)(b)&nbsp;GDPR);
            </li>
            <li>
              processing is necessary for compliance with a legal obligation to
              which we are subject (Article&nbsp;6(1)(1)(c)&nbsp;GDPR);
            </li>
            <li>
              processing is necessary for the purposes of the legitimate
              interests pursued by us or by a third party, except where such
              interests are overridden by your interests or fundamental rights
              and freedoms which require protection of personal data
              (Article&nbsp;6(1)(1)(f)&nbsp;GDPR).
            </li>
          </ul>
          <p>
            Furthermore, we work together with service providers, so-called
            processors, to whom we transfer your personal data and who process
            your data for us on our behalf and in accordance with our
            instructions in compliance with Article 28 GDPR. These service
            providers have been carefully selected and commissioned by us, are
            bound by our instructions and are regularly inspected. Specifically,
            please find below a list of our service providers:
          </p>
          <ul>
            <li>Google LLC.</li>
            <li>GitHub, Inc.</li>
          </ul>
          <p>
            The agreements specify who fulfils which data protection
            obligations, in particular with regard to ensuring an appropriate
            level of security and the implementation of your data subjects&#39;
            rights. We will be pleased to provide you with the essential content
            of the agreements. Please do not hesitate to contact us using the
            contact details given above. You can assert your data subjects&#39;
            rights against any of the jointly responsible parties. The exchange
            of personal data with the cooperation partners takes place within
            the framework of Article&nbsp;6(1)(1)(f)&nbsp;GDPR, as we have a
            legitimate interest in the effective use of the tools.
          </p>
        </li>
        <li>
          <strong>Cookies</strong>
          <p>
            We would like to provide you with a pleasant online experience with
            our website and use cookies for this purpose within the framework of
            Article&nbsp;6(1)(1)(f)&nbsp;GDPR.
          </p>
          <p>
            For this purpose, we use various cookies to ensure the functionality
            of our website and to make the website as informative and
            user-friendly as possible for you. It is important to us that you
            surf comfortably on our website and for this reason the continuous
            optimization of our web page takes a high value.
          </p>
          <p>
            Here you can find out which cookies we use on our website, how they
            work and how you can object to the processing of your personal data
            in detail or delete the personal data collected here. A cookie is a
            small file that is stored in the browser of the end device when the
            website is accessed. Cookies can be used, for example, to identify
            the respective terminal device or to ensure the complete and correct
            display of our website. Cookies also help to provide the services
            included on the website, to personalise content and to customise and
            analyse advertisements.
          </p>
          <p>
            Depending on their function and purpose, cookies can be divided into
            five categories: Technically required cookies, performance cookies,
            functional cookies, analysis cookies and cookies for marketing
            purposes. Please note that it is possible that not all of the
            cookies listed here are used if you visit our website with a mobile
            device.
          </p>
          <p>
            <strong>Technically required cookies</strong>
          </p>
          <p>
            These are cookies that are required so that you can navigate on our
            websites and use the basic functions of the website. Our website
            cannot function properly without these cookies.
          </p>
          <p>
            The legal basis for the use of technically required cookies is 6
            (1)(1)(f) GDPR.
          </p>
          <p>
            <strong>Performance cookies</strong>
          </p>
          <p>
            Performance cookies are used to improve the user-friendliness of a
            website and thus the user experience. Performance cookies collect
            information about how our websites are used, e.g. Internet browser
            and operating system used, domain name of the website from which you
            came, number of visits, average time spent on the site, and pages
            viewed.
          </p>
          <p>
            The legal basis for the use of performance cookies is 6 (1)(1)(a)
            GDPR.
          </p>
          <p>
            <strong>Functional cookies</strong>
          </p>
          <p>
            Functional cookies enable a website to store information that has
            already been entered (such as user names, login, language selection
            or the location where you are) and thus offer the user improved,
            more personal functions.
          </p>
          <p>
            The legal basis for the use of functional cookies is 6 (1)(1)(a)
            GDPR.
          </p>
          <p>
            <strong>Analysis cookies</strong>
          </p>
          <p>
            These cookies enable us to determine how visitors interact with our
            websites by collecting information anonymously, such as what
            preferences or search terms are used to access the website.{" "}
          </p>
          <p>
            <strong>Marketing cookies</strong>
          </p>
          <p>
            Marketing cookies are used to offer content that is more relevant to
            the user and adapted to his interests. They are also used to measure
            and control the effectiveness of advertising campaigns. They
            register whether you have visited a website or not, as well as which
            content has been used. This information may be shared with third
            parties such as advertisers. These cookies are often linked to third
            party site functionality.
          </p>
          <p>
            Which cookies are set on our website and further information on the
            individual cookies can be found in the following overview:
          </p>
          <table className="table table-bordered table-sm table-striped">
            <thead>
              <tr>
                <th>Cookie name</th>
                <th>Cookie provider</th>
                <th>Cookie category</th>
                <th>Storage period</th>
                <th>Opt-out cookie/link</th>
                <th>Link to the Cookie provider&rsquo;s Privacy Policy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>Google Analytics</p>
                </td>
                <td>
                  <address>
                    Google LLC.,
                    <br />
                    1600 Amphitheatre Parkway,
                    <br />
                    Mountain View, CA 94043,
                    <br />
                    USA
                  </address>
                </td>
                <td>
                  <p>analysis cookie</p>
                </td>
                <td>
                  <p>2 years</p>
                </td>
                <td style={{ wordBreak: "break-word" }}>
                  <p>
                    <a href="https://support.google.com/analytics/answer/181881">
                      https://support.google.com/analytics/answer/181881
                    </a>
                  </p>
                  <p>Only set if opted into cookie use.</p>
                </td>
                <td style={{ wordBreak: "break-word" }}>
                  <p>
                    <a href="https://marketingplatform.google.com/about/analytics/terms/us/">
                      https://marketingplatform.google.com/about/analytics/terms/us/
                    </a>
                  </p>
                  <p>and</p>
                  <p>
                    <a href="https://policies.google.com/privacy?hl=en">
                      https://policies.google.com/privacy?hl=en
                    </a>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Consent Cookie</p>
                </td>
                <td>
                  <p>Ververica</p>
                </td>
                <td>
                  <p>Technically required for login via GitHub</p>
                </td>
                <td>
                  <p>1 year</p>
                </td>
                <td>
                  <p>No opt-out (as it requires an opt-in)</p>
                </td>
                <td>
                  <p>Cf. this policy:</p>
                  <Link to="/privacy-policy">
                    https://www.ververica.com/privacy-policy
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Github-token</p>
                </td>
                <td>
                  <p>Ververica</p>
                </td>
                <td>
                  <p>Technically required for login via GitHub</p>
                </td>
                <td>
                  <p>1 month</p>
                </td>
                <td>
                  <p>
                    No opt-out: Only used if agreed to, and logged in through
                    GitHub.
                  </p>
                </td>
                <td>
                  <p>Cf. this policy:</p>
                  <Link to="/privacy-policy">
                    https://www.ververica.com/privacy-policy
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <p></p>
          <p>
            You can deactivate some cookies by setting an opt-out cookie or by
            following the link above. In addition, you can delete individual
            cookies or the entire cookie stock via your browser settings.
            Information and instructions on how to delete these cookies or block
            their storage in advance can be found, depending on the provider of
            your browser, under the following links:
          </p>
          <ul>
            <li>
              Mozilla Firefox:{" "}
              <a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox">
                https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox
              </a>
            </li>
            <li>
              Internet Explorer:{" "}
              <a href="https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies">
                https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies
              </a>
            </li>
            <li>
              Google Chrome:{" "}
              <a href="https://support.google.com/accounts/answer/61416?hl=en">
                https://support.google.com/accounts/answer/61416?hl=en
              </a>
            </li>
            <li>
              Opera:{" "}
              <a href="https://help.opera.com/en/latest/security-and-privacy/">
                https://help.opera.com/en/latest/security-and-privacy/
              </a>
            </li>
            <li>
              Safari:{" "}
              <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac">
                https://support.apple.com/en-gb/guide/safari/sfri11471/mac
              </a>
            </li>
          </ul>
          <p>
            If you do not allow technically required cookies, performance
            cookies and/or functional cookies, we would like to point out that
            certain functionalities on our website are no longer available or
            are only available to a limited extent.
          </p>
        </li>

        <li>
          <strong>Rights of the data subject</strong>

          <p>You have the right:</p>
          <ul>
            <li>
              to demand information in accordance with Article&nbsp;15&nbsp;GDPR
              regarding the processing of your personal data by us. In
              particular, you may request information on the purposes of the
              processing, the categories of personal data, the categories of
              recipient to whom your data have been or are disclosed, the
              envisaged storage period, the existence of the right to
              rectification, erasure, restriction of processing or objection,
              the right to lodge a complaint, the source of your data to the
              extent that these were not collected at our site, and the
              existence of automated decision-making, including profiling and
              any meaningful information on its details;
            </li>
            <li>
              in accordance with Article&nbsp;16&nbsp;GDPR, obtain the
              rectification of any inaccurate personal data stored by us or
              completion of such data without undue delay;
            </li>
            <li>
              in accordance with Article&nbsp;17&nbsp;GDPR, obtain the erasure
              of your personal data stored by us, to the extent that processing
              is not required for exercising the right of freedom of expression
              and information, for compliance with a legal obligation, for
              reasons of public interest or for the establishment, exercise or
              defence of legal claims;
            </li>
            <li>
              in accordance with Article&nbsp;18&nbsp;GDPR, obtain the
              restriction of processing of your personal data, to the extent
              that the accuracy of the data is contested by you, processing is
              unlawful, but you oppose erasure and we no longer need the
              personal data, but you still require them for the establishment,
              exercise or defence of legal claims or you have objected to
              processing pursuant to Article&nbsp;21&nbsp;GDPR;
            </li>
            <li>
              in accordance with Article&nbsp;20&nbsp;GDPR, demand to receive
              your personal data that you have provided to us in a structured,
              commonly used and machine-readable format or to demand
              transmission to another controller;
            </li>
            <li>
              in accordance with Article&nbsp;7(3) GDPR, to withdraw your
              consent once given to us towards us at any time. This has the
              consequence that we may no longer continue the data processing
              activities that were based on this consent in future and
            </li>
            <li>
              in accordance with Article&nbsp;77&nbsp;GDPR, lodge a complaint
              with a supervisory authority. Usually, you may contact the
              supervisory authority at your habitual residence or place of work
              or our registered office for this.
            </li>
          </ul>
        </li>
        <li>
          <strong>Right to object</strong>
          <p>
            As far as your personal data are processed based on legitimate
            interests in accordance with Article&nbsp;6(1)(1)(f)&nbsp;GDPR, you
            have the right to object to processing of your personal data in
            accordance with Article&nbsp;21&nbsp;GDPR, to the extent that there
            are grounds relating to your particular situation or the objection
            is targeted against direct marketing. In the latter case, you have a
            general right to object that will be implemented by us without any
            indication of a particular situation.
          </p>
          <p>
            If you want to exercise your withdrawal right or right to object,
            simply send us an email to dataprotection@ververica.com.
          </p>
        </li>
        <li>
          <strong>Further information</strong>
          <p>
            In accordance with Article&nbsp;13(2)(e)&nbsp;GDPR we would like to
            inform you about the following:
          </p>
          <p>
            The provision of personal data is neither a statutory nor
            contractual requirement, nor a requirement necessary to enter into a
            contract. You are not obliged to provide the personal data. There
            are no consequences resulting from failure to provide such data.
          </p>
          <p>
            In accordance with Article&nbsp;13(2)(f)&nbsp;GDPR we would like to
            inform you about the following:
          </p>
          <p>
            We do not process your personal data for the purpose of automated
            decision-making.
          </p>
          <p>
            In accordance with Article&nbsp;13(1)(f)&nbsp;GDPR we would like to
            inform you that we intend to transfer the personal data to a third
            country or an international organization, namely as follows:
          </p>
          <p>
            Your personal data will also processed by Google and GitHub in the
            USA. To this end, Google and GitHub have submitted to the EU-US
            Privacy Shield, https://www.privacyshield.gov/EU-US-Framework, so
            that an adequate level of data protection can also be guaranteed for
            such a transfer of personal data to the USA. Accordingly, such
            transfer of your personal data to a third country always takes place
            in accordance with Art. 44 GDPR.{" "}
          </p>
        </li>
        <li>
          <strong>Data security</strong>

          <p>
            Within the website visit, we use the common SSL procedure (Secure
            Socket Layer) in conjunction with the respective highest encryption
            level your browser supports. This usually is 256-bit encryption. If
            your browser does not support 256-bit encryption, we will use
            128-bit v3 technology instead. Whether an individual website of our
            internet offer is transmitted encrypted or not is evident by the
            closed display of the key or lock symbol in the lower status bar of
            your browser.
          </p>
          <p>
            Apart from this, we use appropriate technical and organisational
            security measures in order to protect your data from accidental or
            wilful manipulation, partial or complete loss, destruction or
            unauthorised access by third parties. Our security measures will be
            improved continually according to the technological developments.
          </p>
        </li>
        <li>
          <strong>Topicality and changes of this data privacy statement</strong>
          <p>
            This data privacy statement is currently valid as of October 2019.
          </p>
          <p>
            Further development of our website and offers through it or changed
            statutory or authority specifications may require changes to this
            data privacy statement. You may call and print the respective
            current data privacy statement at any time on the website at
            https://www.ververica.com/privacy-policy
          </p>
        </li>
      </ol>
    </LegalCard>
  );
};
type Props = RouteComponentProps;
