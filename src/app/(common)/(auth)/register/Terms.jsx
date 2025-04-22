
const Terms = () => {
    return (
      <div>
        <input type="checkbox" id="terms-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl !overflow-y-hidden">
            <label htmlFor="terms-modal" className="btn btn-sm btn-circle absolute right-3 top-3">✕</label>
            <h3 className="font-bold text-2xl text-center">Terms and Conditions</h3>
            <hr className='mt-4' />
            <div className='text-slate-600 mt-4 text-justify pr-4 overflow-y-auto max-h-[calc(100dvh-300px)]'>
              <p className="mb-3 font-bold text-lg">Welcome to Learn Sharp , your online tutor hiring platform!</p>
              <p>By accessing and using our website, you agree to comply with the following terms and conditions:</p>
  
              <div className='mt-3'>
                <p className='font-semibold underline underline-offset-2 mt-2'>1. Use of Website Content:</p>
                <p>All content on the Learn Sharp  website, including text, images, videos, and other materials, is intended for personal use only. Reproduction, modification, distribution, or any other use of the content without our prior written consent is strictly prohibited.</p>
  
                <p className='font-semibold underline underline-offset-2 mt-2'>2. Tutor Hiring Programs:</p>
                <p>While we strive to provide accurate and reliable information about our tutor hiring programs, we cannot guarantee the completeness or accuracy of the information. Learn Sharp  shall not be held responsible for any damages or losses arising from the use of such information.</p>
  
                <p className='font-semibold underline underline-offset-2 mt-2'>3. Third-Party Links:</p>
                <p>Our website may contain links to third-party websites that are beyond our control. Learn Sharp  is not responsible for the content or privacy practices of these external sites. It is advisable to review the terms and conditions and privacy policies of any linked websites you visit.</p>
  
                <p className='font-semibold underline underline-offset-2 mt-2'>4. User Conduct:</p>
                <p>You are solely responsible for your use of the Learn Sharp  website and any content you contribute. It is prohibited to engage in any unlawful, harmful, or harassing activities on the website, including but not limited to the infringement of intellectual property rights or the dissemination of offensive content.</p>
  
                <p className='font-semibold underline underline-offset-2 mt-2'>5. Disclaimer of Warranties:</p>
                <p>Learn Sharp  website and its content are provided as is without any warranties, express or implied. We do not guarantee the accuracy, reliability, or availability of the website or its uninterrupted and error-free operation.</p>
  
                <p className='font-semibold underline underline-offset-2 mt-2'>6. Limitation of Liability:</p>
                <p>Learn Sharp  shall not be liable for any damages arising from your use or inability to use our website, including but not limited to direct, indirect, incidental, consequential, or punitive damages. This limitation applies to all claims, whether based on warranty, contract, tort, or any other legal theory.</p>
  
                <p className='font-semibold underline underline-offset-2 mt-2'>7. Changes to Terms and Conditions:</p>
                <p>We reserve the right to modify these terms and conditions at any time without prior notice. Your continued use of the Learn Sharp  website signifies your acceptance of the updated terms and conditions.</p>
  
              </div>
  
              <p className='mt-4'>If you have any questions or concerns regarding these terms and conditions, please contact us at <br /> <a className="text-blue-700" href="mailto:info@edu-mentor.com" target="_new">info@edu-mentor.com</a>.</p>
              <p className='mt-2'>Thank you for choosing Learn Sharp  as your online tutor hiring platform!</p>
  
            </div>
            <hr className='mt-4' />
            <div className="modal-action">
              <label htmlFor="terms-modal" className="btn">Okay</label>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Terms;