export function emailTemplate({
    firstName,
    lastName,
    title,
    heading1,
    heading2,
    paragraph1,
    paragraph2,
    paragraph3,
    paragraph4,
    listItems,
    ctaButtons,
}: {
    firstName?: string;
    lastName?: string;
    title?: string;
    email?: string;
    heading1?: string;
    heading2?: string;
    paragraph1?: string;
    paragraph2?: string;
    paragraph3?: string;
    paragraph4?: string;
    listItems?: { label: string; value: string }[];
    ctaButtons?: { label: string; url: string }[];
}) {
return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin-top: 50px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://dabible.com/svg/antioch.svg" alt="DaBible Logo" style="height: 60px; margin-top: 20px;" />
        </div>
        ${title ? `<h2 style="color: #2c3e50; text-align: center; margin-top: 40px;">${title}</h2>` : ''}
        <p>Hi <strong>${capitalize(firstName ?? '')} ${lastName ? `${lastName}` : ''}</strong>,</p>
        ${paragraph1 ? `<p>${paragraph1}</p>` : ''}
        ${heading1 ? `<h3 style="color: #C8385E;">${heading1}</h3>` : ''}  
        ${paragraph2 ? `<p>${paragraph2}</p>` : ''}
    
            ${
                    ctaButtons && ctaButtons.length
                    ? `<div style="text-align: center; margin: 30px 0;">
                            <div>
                            ${ctaButtons
                                    .map(
                                    (btn) =>
                                            `<a href="${btn.url}" style="background-color: #27ae60; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px 10px;">${btn.label}</a>`
                                    )
                                    .join('')}
                            </div>
                            ${
                                ctaButtons[0] && ctaButtons[0].url
                                    ? `<div style="margin-top: 20px; font-size: 14px; color: #888;">
                                            <p style="margin:0">If you have any issues clicking the button above, feel free click the link here below.</p>
                                            <a href="${ctaButtons[0].url}" style="color: #27ae60; text-decoration: none;">${ctaButtons[0].url}</a>
                                        </div>`
                                    : ''
                            }
                            ${
                                ctaButtons[0] && ctaButtons[1].url
                                    ? `<div style="margin-top: 20px; font-size: 14px; color: #888;">
                                            <p style="margin:0">If you have any issues clicking the button above, feel free click the link here below.</p>
                                            <a href="${ctaButtons[1].url}" style="color: #27ae60; text-decoration: none;">${ctaButtons[1].url}</a>
                                        </div>`
                                    : ''
                            }
                            </div>`
                    : ''
            }
        
        ${paragraph3 ? `<p>${paragraph3}</p>` : ''} 
        ${heading2 ? `<h3 style="color: #C8385E;">${heading2}</h3>` : ''}  
        ${listItems && listItems.length
            ? `<ul style="padding-left: 20px; margin: 10px 0; background: #f9f9f9; border-left: 4px solid #27ae60;">${listItems.map(item => `<li><span>${item.label}: </span><span>${item.value}</span></li>`).join('')}</ul>`
            : ''}
     

        ${paragraph4 ? `<p>${paragraph1}</p>` : ''}

        <p style="color: #888; margin-bottom:0">With love,</p>
        <p style="color: #888; margin-topn:0">The DaBible Foundation Team</p>
        <hr style="margin: 30px 0;" />
        <footer style="text-align: center; font-size: 12px; color: #888;">
            <p>Follow us on</p>
            <a href="https://facebook.com/dabiblefoundation" style="margin-right: 10px;">Facebook</a>
            <a href="https://www.youtube.com/@antioch_live" style="margin-right: 10px;">YouTube</a>
            <a href="https://instagram.com/dabiblefoundation">Instagram</a>
        </footer>
    </div>
`;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
