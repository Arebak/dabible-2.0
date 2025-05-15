/** @format */

import FixedGridCarousel from "@/components/FixedGridCarousel";
import StaggeredImageSection from "@/components/StaggeredGridImages";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="d-container px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 flex flex-col items-center justify-center gap-y-4 sm:gap-y-8">
          <h1 className="text-2xl mt-8 sm:text-3xl md:text-4xl font-bold text-[#023E8A] mb-2 font-domine max-w-2xl px-4">Privacy Policy</h1>
          {/* 
          <div className="w-full max-w-md flex flex-col items-center justify-center gap-y-3 sm:gap-y-4 mt-4 sm:mt-8 font-nunito text-xl sm:text-2xl px-4">
            <div className="flex gap-x-1 items-center mb-2 text-[#161515]">
              <span>Goal:</span>
              <span className="font-bold">$15,000</span>
            </div>

            <div className="text-center mb-2">
              <div className="text-sm text-gray-600">Raised money</div>
              <div className="text-lg sm:text-xl font-bold text-red-600">$8,000</div>
            </div>

            <Progress value={53} className="w-full sm:w-[527px]" />

            <div className="mt-4 sm:mt-6">
              <DonateButton />
            </div>
          </div> */}
        </div>
      </div>

      {/* Image Carousel */}
      <div className="my-8 sm:my-12">
        <FixedGridCarousel />
      </div>

      {/* Main Content */}
      <div className="d-container px-4 sm:px-6">
        <div className="grid md:grid-cols-5 gap-6 sm:gap-8">
          <div className="md:col-span-3">
            <div className="space-y-3 sm:space-y-4 text-gray-700 font-mada text-sm sm:text-base">
              <div className="prose prose-sm sm:prose-base lg:prose-lg prose-a:text-blue-600 prose-a:underline prose-a:hover:text-blue-800 text-gray-800 font-mada">
                {/* Simplified Privacy Policy Summary */}
                <div className="border border-blue-200 bg-blue-50 rounded-xl p-6 mb-10">
                  <h2 className="text-xl font-bold text-[#023E8A] mb-4">🔍 Summary of Our Privacy Policy</h2>
                  <p className="mb-4 text-sm">
                    Here’s a quick summary of how DaBible Foundation handles your information:
                  </p>
                  <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
                    <li>
                      <strong>What we collect:</strong> Name, contact details, login info, and payment info if you donate.
                    </li>
                    <li>
                      <strong>How we use it:</strong> To provide our apps and services, process donations, and communicate with you.
                    </li>
                    <li>
                      <strong>We don’t sell your data:</strong> We only share it with trusted partners (like Stripe) as needed.
                    </li>
                    <li>
                      <strong>Your choices:</strong> You can ask us to update or delete your data at any time.
                    </li>
                    <li>
                      <strong>Security:</strong> We use reasonable safeguards to protect your info, but no system is 100% secure.
                    </li>
                    <li>
                      <strong>Your rights:</strong> If you’re in the EU, Canada, or California, you may have extra privacy rights.
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    This is a summary. Please read below for full details.
                  </p>
                </div>
                <h3 className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>PRIVACY NOTICE</strong>
                </h3>

                <p className="mb-4">
                  <strong>Last updated April 16, 2025</strong>
                </p>

                <p className="mb-4">
                  This privacy notice explains how Kerygma Foundation DBA DaBible Foundation (“<strong>we</strong>”, “<strong>us</strong>”, or “<strong>our</strong>”) collects, uses, shares, and protects your information when you:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2">
                  <li>
                    Visit our website at{" "}
                    <a href="https://www.dabible.com/" target="_blank" rel="noreferrer noopener">
                      https://www.dabible.com
                    </a>
                    , or any other website that links to this notice
                  </li>
                  <li>
                    Use our mobile or Facebook apps, or any other application of ours that links to this privacy notice
                  </li>
                  <li>
                    Interact with us in other ways, such as sales, support, marketing, or events
                  </li>
                </ul>

                <p className="mb-4 mt-4">
                  <strong>Questions or concerns?</strong> This notice helps you understand your privacy rights and our practices. If you do not agree, please do not use our services. For questions, email us at support@dabible.com.
                </p>
                <h3 className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>SUMMARY OF KEY POINTS</strong>
                </h3>

                <p className="mb-4">
                  <strong>
                    <em>
                      Here are the main points from our privacy notice. Click the links for more details or use the table of contents to find what you need. You can also click&nbsp;
                    </em>
                  </strong>
                  <a className="text-blue" href="#toc">
                    <strong>
                      <em>here</em>
                    </strong>
                  </a>
                  <strong>
                    <em>&nbsp;to go directly to our table of contents.</em>
                  </strong>
                </p>
                <p className="mb-4 mt-4">
                  <strong>What personal information do we collect?</strong> We collect information you provide and some data automatically when you use our services. <a href="#personalinfo">Learn more</a>
                </p>
                <p className="mb-4">
                  <strong>Sensitive information:</strong> We do not collect sensitive personal information.
                </p>
                <p className="mb-4">
                  <strong>Third-party information:</strong> We do not receive information from third parties.
                </p>
                <p className="mb-4">
                  <strong>How we use your information:</strong> To provide, improve, and secure our services, communicate with you, process donations, and comply with laws. We only use your data when we have a valid legal reason. <a href="#infouse">Learn more</a>
                </p>
                <p className="mb-4">
                  <strong>When do we share your information?</strong> Only in specific cases and with trusted third parties. <a href="#whoshare">Learn more</a>
                </p>
                <p className="mb-4">
                  <strong>How do we keep your information safe?</strong> We use reasonable technical and organizational safeguards. No system is completely secure. <a href="#infosafe">Learn more</a>
                </p>
                <p className="mb-4">
                  <strong>Your rights:</strong> Depending on your location, you may have rights to access, update, or delete your information. <a href="#privacyrights">Learn more</a>
                </p>
                <p className="mb-4">
                  <strong>How to exercise your rights:</strong> Contact us or fill out our request form:{" "}
                  <a href="https://www.dabible.com/contact-us" target="_blank" rel="noreferrer noopener">
                    https://www.dabible.com/contact-us
                  </a>
                  . We will respond as required by law.
                </p>
                <p className="mb-4">
                  Want more details? <a href="#toc">Read the full notice below.</a>
                </p>
                <p className="mb-4">
                  <strong>TABLE OF CONTENTS</strong>
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2 text-sm">
                  <li><a href="#infocollect" className="text-blue-600 underline hover:text-blue-800 transition">1. WHAT INFORMATION DO WE COLLECT?</a></li>
                  <li><a href="#infouse" className="text-blue-600 underline hover:text-blue-800 transition">2. HOW DO WE PROCESS YOUR INFORMATION?</a></li>
                  <li><a href="#legalbases" className="text-blue-600 underline hover:text-blue-800 transition">3. WHAT LEGAL BASES DO WE RELY ON?</a></li>
                  <li><a href="#whoshare" className="text-blue-600 underline hover:text-blue-800 transition">4. WHEN AND WITH WHOM DO WE SHARE YOUR INFORMATION?</a></li>
                  <li><a href="#sociallogins" className="text-blue-600 underline hover:text-blue-800 transition">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
                  <li><a href="#inforetain" className="text-blue-600 underline hover:text-blue-800 transition">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                  <li><a href="#infosafe" className="text-blue-600 underline hover:text-blue-800 transition">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
                  <li><a href="#infominors" className="text-blue-600 underline hover:text-blue-800 transition">8. DO WE COLLECT INFORMATION FROM MINORS?</a></li>
                  <li><a href="#privacyrights" className="text-blue-600 underline hover:text-blue-800 transition">9. WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                  <li><a href="#DNT" className="text-blue-600 underline hover:text-blue-800 transition">10. DO-NOT-TRACK FEATURES</a></li>
                  <li><a href="#caresidents" className="text-blue-600 underline hover:text-blue-800 transition">11. CALIFORNIA PRIVACY RIGHTS</a></li>
                  <li><a href="#policyupdates" className="text-blue-600 underline hover:text-blue-800 transition">12. UPDATES TO THIS NOTICE</a></li>
                  <li><a href="#contact" className="text-blue-600 underline hover:text-blue-800 transition">13. HOW TO CONTACT US</a></li>
                  <li><a href="#request" className="text-blue-600 underline hover:text-blue-800 transition">14. HOW TO REVIEW, UPDATE, OR DELETE YOUR DATA</a></li>
                </ul>

                <h3 id="infocollect" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>1. WHAT INFORMATION DO WE COLLECT?</strong>
                </h3>

                <p className="mb-4">
                  <strong>Personal information you disclose to us</strong>
                </p>
                <p className="mb-4">
                  <strong>
                    <em>In Short:</em>
                  </strong>
                  <em>We collect personal information that you provide to us.</em>
                </p>
                <p className="mb-4">
                  We collect personal information that you voluntarily provide to us when you register on the Services,&nbsp;express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when
                  you contact us.
                </p>
                <p className="mb-4">
                  <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect
                  may include the following:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2">
                  <li>names</li>
                  <li>phone numbers</li>
                  <li>email addresses</li>
                  <li>mailing addresses</li>
                  <li>usernames</li>
                  <li>passwords</li>
                  <li>contact preferences</li>
                  <li>contact or authentication data</li>
                  <li>billing addresses</li>
                  <li>debit/credit card numbers</li>
                </ul>

                <p className="mb-4">
                  <strong>Sensitive Information.</strong> We do not process sensitive information.
                </p>
                <p className="mb-4">
                  <strong>Payment Data.</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is
                  stored by Stripe. You may find their privacy notice link(s) here:{" "}
                  <a href="https://stripe.com/en-my/privacy" target="_blank" rel="noreferrer noopener">
                    https://stripe.com/en-my/privacy
                  </a>
                  .
                </p>
                <p className="mb-4">
                  <strong>Social Media Login Data.&nbsp;</strong>We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register in this way, we will
                  collect the information described in the section called “<a href="#sociallogins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>” below.
                </p>
                <p className="mb-4">All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>

                <p className="mb-4">
                  <strong>Information automatically collected</strong>
                </p>
                <p className="mb-4">
                  <strong>
                    <em>In Short:</em>
                  </strong>
                  <em>Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em>
                </p>
                <p className="mb-4">
                  We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address,
                  browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the
                  security and operation of our Services, and for our internal analytics and reporting purposes.
                </p>
                <p className="mb-4">The information we collect includes:</p>
                <ul className="list-disc list-outside ml-6 space-y-2">
                  <li>
                    <em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us,
                    this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services&nbsp;(such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you
                    take such as which features you use), device event information (such as system activity, error reports (sometimes called “crash dumps”), and hardware settings).
                  </li>
                  <li>
                    <em>Device Data.</em> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy
                    server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.
                  </li>
                  <li>
                    <em>Location Data.</em> We collect location data such as information about your device’s location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For
                    example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling
                    your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.
                  </li>
                </ul>

                <p className="mb-4">
                  <strong>Information collected when you use our Facebook application(s).</strong> We by default access your&nbsp;
                  <a href="https://www.facebook.com/about/privacy/" rel="noreferrer noopener" target="_blank">
                    Facebook
                  </a>
                  &nbsp;basic account information, including your name, email, gender, birthday, current city, and profile picture URL, as well as other information that you choose to make public. We may also request access to other permissions related to your account, such as
                  friends, check-ins, and likes, and you may choose to grant or deny us access to each individual permission. For more information regarding Facebook permissions, refer to the&nbsp;
                  <a href="https://developers.facebook.com/docs/facebook-login/permissions" rel="noreferrer noopener" target="_blank">
                    Facebook Permissions Reference
                  </a>
                  &nbsp;page.
                </p>

                <h3 id="infouse" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>2. HOW DO WE PROCESS YOUR INFORMATION?</strong>
                </h3>

                <p>
                  <strong>
                    <em>In Short:&nbsp;</em>
                  </strong>
                  <em>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em>
                </p>

                <p>
                  <strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong>
                </p>

                <ul className="list-disc list-outside my-2 ml-8 space-y-2">
                  <li>
                    <strong>To facilitate account creation and authentication and otherwise manage user accounts.&nbsp;</strong>We may process your information so you can create and log in to your account, as well as keep your account in working order.
                  </li>
                  <li>
                    <strong>To deliver and facilitate delivery of services to the user.&nbsp;</strong>We may process your information to provide you with the requested service.
                  </li>
                  <li>
                    <strong>To respond to user inquiries/offer support to users.&nbsp;</strong>We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.
                  </li>
                  <li>
                    <strong>To fulfill and manage your orders.</strong> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.
                  </li>
                  <li>
                    <strong>To enable user-to-user communications.&nbsp;</strong>We may process your information if you choose to use any of our offerings that allow for communication with another user.
                  </li>
                  <li>
                    <strong>To save or protect an individual’s vital interest.</strong> We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.
                  </li>
                </ul>

                <h3 id="legalbases" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</strong>
                </h3>

                <p>
                  <em>
                    <strong>In Short:&nbsp;</strong>We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with
                    services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.
                  </em>
                </p>

                <p>
                  <em>
                    <strong>
                      <u>If you are located in the EU or UK, this section applies to you.</u>
                    </strong>
                  </em>
                </p>

                <p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>

                <ul  className="list-disc list-outside my-2 ml-8 space-y-2">
                  <li>
                    <strong>Consent.&nbsp;</strong>We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Click&nbsp;<a href="#withdrawconsent">here</a>
                    &nbsp;to learn more.
                  </li>
                  <li>
                    <strong>Performance of a Contract.</strong> We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.
                  </li>
                  <li>
                    <strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or
                    disclose your information as evidence in litigation in which we are involved.
                  </li>
                  <li>
                    <strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.
                  </li>
                </ul>

                <p>
                  <strong>
                    <u>
                      <em>If you are located in Canada, this section applies to you.</em>
                    </u>
                  </strong>
                </p>

                <p>
                  We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your
                  consent at any time. Click&nbsp;<a href="#withdrawconsent">here</a>&nbsp;to learn more.
                </p>

                <p>In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>

                <ul  className="list-disc list-outside my-2 ml-8 space-y-2">
                  <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                  <li>For investigations and fraud detection and prevention</li>
                  <li>For business transactions provided certain conditions are met</li>
                  <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                  <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
                  <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                  <li>
                    If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of
                    Canada or a province
                  </li>
                  <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                  <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
                  <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                  <li>If the information is publicly available and is specified by the regulations</li>
                </ul>

                <h3 id="whoshare" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</strong>
                </h3>

                <p>
                  <strong>
                    <em>In Short:</em>
                  </strong>
                  <em>&nbsp;We may share information in specific situations described in this section and/or with the following categories of third parties.</em>
                </p>

                <p>
                  <strong>Vendors, Consultants, and Other Third-Party Service Providers.</strong> We may share your data with third-party vendors, service providers, contractors, or agents (“<strong>third parties</strong>“) who perform services for us or on our behalf and require
                  access to such information to do that work. We have contracts in place with our third parties, which are designed to help safeguard your personal information. This means that they cannot do anything with your personal information unless we have instructed them
                  to do it. They will also not share your personal information with any organization apart from us. They also commit to protect the data they hold on our behalf and to retain it for the period we instruct. The categories of third parties we may share personal
                  information with are as follows:
                </p>

                <ul  className="list-disc list-outside my-2 ml-8 space-y-2">
                  <li>Data Analytics Services</li>
                  <li>Data Storage Service Providers</li>
                  <li>User Account Registration &amp; Authentication Services</li>
                  <li>Payment Processors</li>
                  <li>Order Fulfillment Service Providers</li>
                  <li>Performance Monitoring Tools</li>
                </ul>

                <p>We also may need to share your personal information in the following situations:</p>

                <ul  className="list-disc list-outside my-2 ml-8 space-y-2">
                  <li>
                    <strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                  </li>
                  <li>
                    <strong>Offer Wall.&nbsp;</strong>Our application(s) may display a third-party hosted “offer wall.” Such an offer wall allows third-party advertisers to offer virtual currency, gifts, or other items to users in return for the acceptance and completion of an
                    advertisement offer. Such an offer wall may appear in our application(s) and be displayed to you based on certain data, such as your geographic area or demographic information. When you click on an offer wall, you will be brought to an external website
                    belonging to other persons and will leave our application(s). A unique identifier, such as your user ID, will be shared with the offer wall provider in order to prevent fraud and properly credit your account with the relevant reward.
                  </li>
                </ul>

                <h3 id="sociallogins" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</strong>
                </h3>

                <p>
                  <strong>
                    <em>In Short:&nbsp;</em>
                  </strong>
                  <em>If you choose to register or log in to our services using a social media account, we may have access to certain information about you.</em>
                </p>

                <p>
                  Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media
                  provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social
                  media platform. If you log in using Facebook, we may also request access to other permissions related to your account, such as your friends, check-ins, and likes, and you may choose to grant or deny us access to each individual permission.
                </p>

                <p>
                  We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal
                  information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
                </p>

                <h3 id="inforetain" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>6. HOW LONG DO WE KEEP YOUR INFORMATION?</strong>
                </h3>

                <p>
                  <strong>
                    <em>In Short:&nbsp;</em>
                  </strong>
                  <em>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</em>
                </p>

                <p>
                  We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in
                  this notice will require us keeping your personal information for longer than twelve (12) months past the termination of the user’s account.
                </p>

                <p>
                  When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we
                  will securely store your personal information and isolate it from any further processing until deletion is possible.
                </p>

                <h3 className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</strong>
                </h3>

                <p>
                  <strong>
                    <em>In Short:&nbsp;</em>
                  </strong>
                  <em>We aim to protect your personal information through a system of organizational and technical security measures.</em>
                </p>

                <p>
                  We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic
                  transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly
                  collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure
                  environment.
                </p>

                <h3 id="infominors" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>8. DO WE COLLECT INFORMATION FROM MINORS?</strong>
                </h3>

                <p>
                  <strong>
                    <em>In Short:</em>
                  </strong>
                  <em>&nbsp;We do not knowingly collect data from or market to children under 18 years of age.</em>
                </p>

                <p>
                  We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If
                  we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from
                  children under age 18, please contact us at support@dabible.com.
                </p>

                <h3 id="privacyrights" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>9. WHAT ARE YOUR PRIVACY RIGHTS?</strong>
                </h3>

                <p>
                  <strong>
                    <em>In Short:</em>
                  </strong>
                  <em>
                    &nbsp;In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Canada, you have rights that allow you greater access to and control over your personal information.&nbsp;You may review, change, or terminate your account at any time.
                  </em>
                </p>

                <p>
                  In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to
                  restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by
                  using the contact details provided in the section “<a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>” below.
                </p>

                <p>We will consider and act upon any request in accordance with applicable data protection laws.</p>

                <p>
                  If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here:{" "}
                  <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" rel="noreferrer noopener" target="_blank">
                    https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
                  </a>
                  .
                </p>

                <p>
                  If you are located in Switzerland, the contact details for the data protection authorities are available here:{" "}
                  <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" rel="noreferrer noopener" target="_blank">
                    https://www.edoeb.admin.ch/edoeb/en/home.html
                  </a>
                  .
                </p>

                <p>
                  <strong>
                    <u>Withdrawing your consent:</u>
                  </strong>{" "}
                  If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting
                  us by using the contact details provided in the section “<a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>” below.
                </p>

                <p>
                  However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than
                  consent.
                </p>

                <p>
                  <strong>Account Information</strong>
                </p>

                <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>

                <ul>
                  <li>Contact us using the contact information provided.</li>
                </ul>

                <p>
                  Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations,
                  enforce our legal terms and/or comply with applicable legal requirements.
                </p>

                <p>If you have questions or comments about your privacy rights, you may email us at support@dabible.com.</p>

                <h3 id="DNT" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>10. CONTROLS FOR DO-NOT-TRACK FEATURES</strong>
                </h3>

                <p>
                  Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At
                  this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If
                  a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
                </p>

                <h3 id="caresidents" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</strong>
                </h3>

                <p>
                  <strong>
                    <em>In Short:&nbsp;</em>
                  </strong>
                  <em>Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</em>
                </p>

                <p>
                  California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we
                  disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a
                  request, please submit your request in writing to us using the contact information provided below.
                </p>

                <p>
                  If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the
                  contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be
                  completely or comprehensively removed from all our systems (e.g., backups, etc.).
                </p>

                <p>
                  <strong>CCPA Privacy Notice</strong>
                </p>

                <p>The California Code of Regulations defines a “resident” as:</p>

                <p>(1) every individual who is in the State of California for other than a temporary or transitory purpose and</p>

                <p>(2) every individual who is domiciled in the State of California who is outside the State of California for a temporary or transitory purpose</p>

                <p>All other individuals are defined as “non-residents.”</p>

                <p>If this definition of “resident” applies to you, we must adhere to certain rights and obligations regarding your personal information.</p>

                <p>
                  <strong>What categories of personal information do we collect?</strong>
                </p>

                <p>We have collected the following categories of personal information in the past twelve (12) months:</p>

                <div className="overflow-x-auto">
                  <table className="table-auto w-full text-left border border-gray-300">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Category</strong>
                        </td>
                        <td>
                          <strong>Examples</strong>
                        </td>
                        <td>
                          <strong>Collected</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>A. Identifiers</td>
                        <td>Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                        <td>NO</td>
                      </tr>
                      <tr>
                        <td>B. Personal information categories listed in the California Customer Records statute</td>
                        <td>Name, contact information, education, employment, employment history, and financial information</td>
                        <td>YES</td>
                      </tr>
                      <tr>
                        <td>C. Protected classification characteristics under California or federal law</td>
                        <td>Gender and date of birth</td>
                        <td>NO</td>
                      </tr>
                      <tr>
                        <td>D. Commercial information</td>
                        <td>Transaction information, purchase history, financial details, and payment information</td>
                        <td>NO</td>
                      </tr>
                      <tr>
                        <td>E. Biometric information</td>
                        <td>Fingerprints and voiceprints</td>
                        <td>NO</td>
                      </tr>
                      <tr>
                        <td>F. Internet or other similar network activity</td>
                        <td>Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
                        <td>NO</td>
                      </tr>
                      <tr>
                        <td>G. Geolocation data</td>
                        <td>Device location</td>
                        <td>NO</td>
                      </tr>
                      <tr>
                        <td>H. Audio, electronic, visual, thermal, olfactory, or similar information</td>
                        <td>Images and audio, video or call recordings created in connection with our business activities</td>
                        <td>NO</td>
                      </tr>
                      <tr>
                        <td>I. Professional or employment-related information</td>
                        <td>Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td>
                        <td>NO</td>
                      </tr>
                      <tr>
                        <td>J. Education Information</td>
                        <td>Student records and directory information</td>
                        <td>NO</td>
                      </tr>
                      <tr>
                        <td>K. Inferences drawn from other personal information</td>
                        <td>Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics</td>
                        <td>NO</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4">We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:</p>

                <ul  className="list-disc list-outside ml-8 space-y-2">
                  <li>Receiving help through our customer support channels;</li>
                  <li>Participation in customer surveys or contests; and</li>
                
                  <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
                </ul>

                 <h3 id="caresidents" className="font-bold text-[#023E8A] mb-2 mt-8">
                  <strong>How do we use and share your personal information?</strong>
                </h3>

                <p>More information about our data collection and sharing practices can be found in this privacy notice. You may contact us by email at&nbsp;support@dabible.com, or by referring to the contact details at the bottom of this document.</p>

                <p>If you are using an authorized agent to exercise your right to opt out we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf.</p>

                <h3 id="caresidents" className="font-bold text-[#023E8A] mb-2 mt-8">
                  <strong>Will your information be shared with anyone else?</strong>
                </h3>
                
                <ul  className="list-disc list-outside ml-8 space-y-2">

                
                <li>We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes the information on our behalf.</li>

                <li>We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be “selling” of your personal information.</li>

                <li>Kerygma Foundation DBA DaBible Foundation has not sold any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months.&nbsp;</li>

                <li>Kerygma Foundation DBA DaBible Foundation&nbsp;has disclosed the following categories of personal information to third parties for a business or commercial purpose in the preceding twelve (12) months:</li>

                <p>
                  The categories of third parties to whom we disclosed personal information for a business or commercial purpose can be found under “<a href="#whoshare">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>“.
                </p>
                </ul>

                <h3 id="caresidents" className="font-bold text-[#023E8A] mb-2 mt-8">
                  <strong>Your rights with respect to your personal data</strong>
                </h3>
                <p>
                  You can ask for the deletion of your personal information. If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law, such as (but not limited to) the
                  exercise by another consumer of his or her right to free speech, our compliance requirements resulting from a legal obligation, or any processing that may be required to protect against illegal activities.
                </p>

                <h3 id="caresidents" className="font-bold text-[#023E8A] mb-2 mt-8">Right to be informed — Request to know</h3>

                <p>Depending on the circumstances, you have a right to know:</p>

                <ul className="list-disc list-outside ml-8 space-y-2">
                  <li>whether we collect and use your personal information;</li>
                  <li>the categories of personal information that we collect;</li>
                  <li>the purposes for which the collected personal information is used;</li>
                  <li>whether we sell your personal information to third parties;</li>
                  <li>the categories of personal information that we sold or disclosed for a business purpose;</li>
                  <li>the categories of third parties to whom the personal information was sold or disclosed for a business purpose; and</li>
                  <li>the business or commercial purpose for collecting or selling personal information.</li>
                </ul>

                <p>In accordance with applicable law, we are not obligated to provide or delete consumer information that is de-identified in response to a consumer request or to re-identify individual data to verify a consumer request.</p>

                <p>Right to Non-Discrimination for the Exercise of a Consumer’s Privacy Rights</p>

                <p>We will not discriminate against you if you exercise your privacy rights.</p>

                <h3 id="caresidents" className="font-bold text-[#023E8A] mb-2 mt-8">Verification process</h3>

                <p>
                  Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. These verification efforts require us to ask you to provide information so that we can match it with
                  information you have previously provided us. For instance, depending on the type of request you submit, we may ask you to provide certain information so that we can match the information you provide with the information we already have on file, or we may contact
                  you through a communication method (e.g., phone or email) that you have previously provided to us. We may also use other verification methods as the circumstances dictate.
                </p>

                <p>
                  We will only use personal information provided in your request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting additional information from you for the purposes of verification. However, if we cannot
                  verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes. We will delete such additionally provided
                  information as soon as we finish verifying you.
                </p>

                <h3 id="caresidents" className="font-bold text-[#023E8A] mb-2 mt-8">Other privacy rights</h3>

                <ul  className="list-disc list-outside ml-8 space-y-2">
                  <li>You may object to the processing of your personal information.</li>
                  <li>You may request correction of your personal data if it is incorrect or no longer relevant, or ask to restrict the processing of the information.</li>
                  <li>You can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with the CCPA.</li>
                  <li>
                    You may request to opt out from future selling of your personal information to third parties. Upon receiving an opt-out request, we will act upon the request as soon as feasibly possible, but no later than fifteen (15) days from the date of the request
                    submission.
                  </li>
                </ul>

                <p>To exercise these rights, you can contact us&nbsp;by email at support@dabible.com, or by referring to the contact details at the bottom of this document. If you have a complaint about how we handle your data, we would like to hear from you.</p>

                <h3 id="policyupdates" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>12. DO WE MAKE UPDATES TO THIS NOTICE?</strong>
                </h3>

                <p>
                  <em>
                    <strong>In Short:&nbsp;</strong>Yes, we will update this notice as necessary to stay compliant with relevant laws.
                  </em>
                </p>

                <p>
                  We may update this privacy notice from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you
                  either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
                </p>

                <h3 id="contact" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</strong>
                </h3>

                <p>If you have questions or comments about this notice, you may email us at support@dabible.com&nbsp;or by post to:</p>

                <p>Kerygma Foundation DBA DaBible Foundation</p>

                <p>2613 Bonnie Oaks Dr,</p>

                <p>Huntsville, AL 35803</p>

                <p>United States</p>

                <h3 id="request" className="font-bold text-[#023E8A] mb-4 mt-8">
                  <strong>14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</strong>
                </h3>

                <p>
                  Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it.&nbsp;To request to review, update, or delete your personal information, please visit:{" "}
                  <a href="https://www.support.dabible.com" target="_blank" rel="noreferrer noopener">
                    https://support.www.dabible.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Images  */}
      <StaggeredImageSection />
    </div>
  );
}
