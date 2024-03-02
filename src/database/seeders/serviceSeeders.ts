 
import { Service } from "../../models/Service";
import { AppDataSource } from "../db";


const serviceSeedDatabase = async() => {
    try {
    await AppDataSource.initialize();

    const service1 = new Service();
    service1.services_name = "Tatuajes personalizados"
    service1.description = "Los clientes tendrán la libertad de seleccionar motivos y diseños únicos, personalizando completamente su experiencia de tatuaje de acuerdo a sus preferencias y gustos."
    await service1.save();

    const service2 = new Service();
    service2.services_name = "Tatuajes del catálogo"
    service2.description = "Ofrecemos la realización de tatuajes basados en diseños predefinidos en nuestro catálogo. Los clientes pueden elegir entre una variedad de opciones estilizadas y probadas."
    await service2.save();

    const service3 = new Service();
    service3.services_name = "Restauración y rejuvenecimiento de trabajos"
    service3.description = "Nos especializamos en la restauración y rejuvenecimiento de tatuajes existentes.Nuestros expertos trabajan para mejorar y renovar tatuajes antiguos, devolviéndoles su vitalidad."
    await service3.save();

    const service4 = new Service();
    service4.services_name = "Colocación de piercings y dilatadores"
    service4.description = "Ofrecemos servicios profesionales para la colocación de piercings y dilatadores.Nuestro equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales de nuestros clientes."
    await service4.save();

    const service5 = new Service();
    service5.services_name = "Venta de piercings y otros artículos"
    service5.description = "Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros artículos relacionados con el arte corporal. Los clientes pueden adquirir productos de calidad para complementar su estilo único."
    await service5.save();

    
    console.log("Se han guardado corectamente los datos de servicios")

    } catch (error) {
    console.log(error);
    } finally {
    await AppDataSource.destroy()
    }
    }
    serviceSeedDatabase();