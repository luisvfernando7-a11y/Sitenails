export const CONTACT = Object.freeze({phone:"5514996238393",displayPhone:"(14) 99623-8393",instagram:"https://instagram.com/lash_helenamorelin",address:"Rua Manoel Vieira Júnior, 922, Jardim Europa, Ourinhos, SP"});
export const whatsapp = (message="Olá, Helena! Quero agendar um horário.") => "https://wa.me/"+CONTACT.phone+"?text="+encodeURIComponent(message);
export const mapUrl = "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(CONTACT.address);
