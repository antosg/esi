import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the TermsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

    terms: any;
    dLang: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, translate: TranslateService) {
    this.dLang = translate.getDefaultLang();
    //console.log("idioma por defecto -> " + this.dLang);
    //this.http.get('https://reponline.herokuapp.com/masters/termsandcoditions/' + this.dLang).map(res => res.json()).subscribe(data => {
    //    this.terms = data.p0
  //        + "\n\n" + data.p01+ "\n\n" + data.p001 + "\n\n" + data.p002 + "\n\n" + data.p003 + "\n\n" + data.p004
  //        + "\n\n" + data.p2 + "\n\n" + data.p21 + "\n\n" + data.p22 + "\n\n" + data.p23
  //        + "\n\n" + data.p3 + "\n\n" + data.p31 + "\n\n" + data.p32 + "\n\n" + data.p33+ "\n\n" + data.p34
  //        + "\n\n" + data.p35 + "\n\n" + data.p36+ "\n\n" + data.p37
  //        + "\n\n" + data.p4 + "\n\n" + data.p41 + "\n\n" + data.p42 + "\n\n" + data.p43
  //        + "\n\n" + data.p5 + "\n\n" + data.p51
  //        + "\n\n" + data.p6 + "\n\n" + data.p61 + "\n\n" + data.p62
  //        + "\n\n" + data.p7 + "\n\n" + data.p71 + "\n\n" + data.p72
  //        + "\n\n" + data.p8 + "\n\n" + data.p81 + "\n\n" + data.p82
  //        + "\n\n" + data.p9 + "\n\n" + data.p91 + "\n\n" + data.p92 + "\n\n" + data.p93 + "\n\n" + data.p94
  //        + "\n\n" + data.p10 + "\n\n" + data.p101 + "\n\n" + data.p102 + "\n\n" + data.p103
  //        + "\n\n" + data.p11 + "\n\n" + data.p111
  //        + "\n\n" + data.p12 + "\n\n" + data.p121 + "\n\n" + data.p122
  //        + "\n\n" + data.p13 + "\n\n" + data.p131 + "\n\n" + data.p132 + "\n\n" + data.p133 + "\n\n" + data.p134
  //        + "\n\n" + data.p135 + "\n\n" + data.p136
  //        + "\n\n" + data.p14 + "\n\n" + data.p141 + "\n\n" + data.p142 + "\n\n" + data.p143 + "\n\n" + data.p144;

        //console.log("terms -> " + this.terms);
  //    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
    this.terms = "Derechos de autor y marcas registradas"
    + "\n\n"
    +"Todo el contenido es propiedad de MooD"
+ "\n\n"
    +"Todos los derechos de autor y marcas registradas reservados."
+ "\n\n"
    +"Contenido"
+ "\n\n"
    +"Todo texto, información, datos, fotografías, gráficos, código html, software informático, código fuente y código objeto, muestras de audio y video, marcas y logotipos, y"
    +"similares (en adelante el 'Contenido') que aparezcan en esta aplicación (en adelante 'Aplicación Móvil')"
    +"pertenecen a MooD o sus empresas afiliadas salvo que quede expresamente especificado en esta Aplicación Móvil. Los Usuarios (como se definen en el presente documento) solo"
    +"pueden utilizar el Contenido en"
    +"un dispositivo móvil (por ejemplo, un dispositivo Android) que posean o controlen, y solamente por los motivos por lo que mueven el uso interno de esta Aplicación Móvil,"
    +"Ningún otro uso del Contenido, incluyendo, entre otras, cualquier clase"
    +"de reedición del mismo, está permitido sin previa autorización por escrito otorgada por la Compañía. Todo Usuario que haya violado comprobadamente la propiedad intelectual de un"
    +"tercero mediante la retransmisión o publicación de material vinculado con esta Aplicación Móvil que infrinja los derechos de autor u otros derechos legales de dicho tercero será"
    +"excluido de esta Aplicación Móvil."
+ "\n\n"
    +"Todas las marcas registradas utilizadas en esta Aplicación Móvil son propiedad de la Compañía."
    +"Ningún tercero puede utilizar ni reproducir ninguna marca registrada que incluya, entre otros, logotipos y dominios de Internet que utilicen las marcas registradas 'MooD'"
    +"(ya sea que se usen o no con letras mayúsculas o espacios) sin el previo consentimiento por escrito de la Compañía o del propietario de la marca registrada."
+ "\n\n"
    +"Aparte del derecho de uso no exclusivo, no sublicenciable, intransferible, personal y limitado de los Usuarios tal como se especifica en la presente, no se confiere ningún derecho"
    +"a dicho Contenido ni a porciones del mismo, sin importar la forma en que aparezca, mediante su inclusión en esta Aplicación Móvil o mediante el acceso al mismo por parte del Usuario."
    +"Un Usuario no puede: (a) separar ningún Contenido individual o componente de la Aplicación Móvil para otro uso que el indicado en relación a la Aplicación Móvil; (b) incorporar"
    +"una porción del mismo a los propios programas del Usuario o recopilar cualquier porción en combinación con los propios programas del Usuario; (c) transferirlo para ser utilizado"
    +"por otro servicio; o (d) vender, arrendar, ceder, prestar, distribuir, comunicar públicamente, transformar o sublicenciar la Aplicación Móvil o conceder en modo alguno cualquier"
    +"derecho a la Aplicación Móvil absoluta o parcialmente. La Compañía será responsable de todo mantenimiento o soporte técnico de la Aplicación Móvil; ningún Tercero (como se define"
    +"en el presente documento) será responsable de brindar servicios de mantenimiento o soporte técnico para la Aplicación Móvil."
    +"La Compañía se reserva el derecho de enmendar, complementar o suspender total o parcialmente la Aplicación Móvil en forma ocasional. Asimismo, la Compañía se reserva el derecho"
    +"de cambiar los Términos y Condiciones en cualquier momento, con vigencia inmediata a partir del momento que se actualiza la Aplicación Móvil. Los términos 'Usuario' y 'Usuarios'"
    +"se refieren a todo individuo o entidad que use, acceda, descargue, instale, obtenga o brinde información desde y hacia esta Aplicación Móvil. Todas las referencias al plural en"
    +"la presente incluirán al singular y las referencias al singular incluirán al plural salvo que se desprenda otra interpretación del contexto."
+ "\n\n"
    +"La Compañía ha adoptado e implementado una política que prevé la terminación, en circunstancias apropiadas, de las cuentas de los Usuarios que son infractores reincidentes o que"
    +"son acusados repetidamente de una infracción."
+ "\n\n"
    +"Uso"
+ "\n\n"
    +"Al usar, acceder, descargar, instalar, obtener o brindar información desde y hacia esta Aplicación Móvil, se considerará que los Usuarios han leído y aceptado estos Términos y"
    +"Condiciones (incluyendo nuestra Política de Privacidad), que se incorpora al presente documento en virtud de esta referencia."
+ "\n\n"
    +"Los Usuarios deben suspender el uso de esta Aplicación Móvil inmediatamente si no están de acuerdo o no aceptan todos estos Términos y Condiciones. La Compañía se reserva el derecho"
    +"de eliminar o prohibir a cualquier Usuario la utilización de esta Aplicación Móvil a su sola discreción."
+ "\n\n"
    +"Las puntuaciones que se realicen en las encuestas, si bien registran el usuario que las ha realizado con el objetivo único de poder proporcionar una mejor usabilidad al cliente,"
    +"serán anónimas para todo el que pueda consultar los datos. Nadie podrá saber nunca quién ha votado qué. Con los comentarios que se realicen en las encuestas se procederá de la"
    +"misma manera, siempre se mantendrá el anonimato de los participantes."
+ "\n\n"
    +"Cuentas de usuario"
+ "\n\n"
    +"La Compañía puede, a su sola discreción, brindar acceso a los Usuarios a porciones restringidas de esta Aplicación Móvil."
+ "\n\n"
    +"Los Usuarios que entren a dichas ubicaciones podrían estar sujetos a Términos y Condiciones adicionales según se especifique en relación a los servicios proporcionados. Los Usuarios"
    +"con cuentas de servicio son responsables exclusivos de preservar la confidencialidad de toda información de acceso, la información de la cuenta del Usuario y todas las acciones u"
    +"omisiones vinculadas con dicha cuenta."
+ "\n\n"
    +"Es responsabilidad de usuario velar por la confidencialidad de su acceso a la Aplicación móvil. MooD no será responsable si esa confidencialidad se ve alterada por el usuario."
+ "\n\n"
    +"Envío de contenidos"
+ "\n\n"
    +"En caso de que un Usuario envíe imágenes digitales u otro contenido, incluidas todas las fotografías, ilustraciones, gráficos y texto (en forma conjunta, “Materiales”) a la Compañía"
    +"a través de la Aplicación Móvil, tendrán validez los siguientes términos:"
+ "\n\n"
    +"El Usuario solo podrá enviar a la Compañía, a través de la Aplicación Móvil, Materiales de los cuales posea todos los derechos de propiedad intelectual. Dicho de otro modo, si un"
    +"Usuario envía una imagen digital a la Compañía, el Usuario debe poseer todos los derechos sobre dicha imagen o el Usuario debe tener la autorización de la persona propietaria de"
    +"tales derechos. Asimismo, un Usuario no puede enviar ninguna información susceptible de identificación personal sobre un niño menor de 13 años de edad."
+ "\n\n"
     +"Por el presente el Usuario cede a la Compañía los derechos y licencias mundiales, sin exclusividad, libres de regalías y a perpetuidad para (a) reproducir, distribuir, transmitir,"
     +"representar y exhibir públicamente los Materiales, total o parcialmente, de cualquier manera y en cualquier medio para transmitir información, existente en la actualidad o que se"
     +"cree en el futuro (“Medios”), (b) modificar, adaptar, traducir y crear trabajos derivados de los Materiales, total o parcialmente, de cualquier manera y en cualesquiera Medios, y (c)"
     +"otorgar sublicencias por los derechos antedichos, total o parcialmente, a terceros con o sin canon de concesión."
+ "\n\n"
    +"Por el presente el Usuario otorga a la Compañía y sus sublicenciatarios una licencia sin exclusividad, mundial y libre de regalías para usar todas las marcas registradas, nombres"
    +"comerciales y los nombres e imágenes de todo individuo que aparezca en los Materiales. El Usuario otorga a la Compañía y sus sublicenciatarios el derecho a usar el nombre que el"
    +"Usuario envíe en relación con los Materiales."
+ "\n\n"
    +"Terceros"
+ "\n\n"
    +"Los prestadores de servicio de telefonía inalámbrica de los Usuarios, los fabricantes y vendedores de los dispositivos móviles en los que el Usuario descargue, instale, utilice o"
    +"acceda a la Aplicación Móvil, el creador del sistema operativo para los dispositivos móviles de los Usuarios y el operador de cualquier tienda de aplicaciones o servicios similares"
    +"mediante los cuales los usuarios obtengan la Aplicación Móvil, si existieran, (en conjunto, los “Terceros”) no son parte de estos Términos y Condiciones y no son propietarios ni"
    +"responsables de la Aplicación Móvil. Los Terceros no brindan ninguna garantía en relación con la Aplicación Móvil. No son responsables del mantenimiento u otros servicios de soporte"
    +"técnico de la Aplicación Móvil y no serán responsables ante ningún otro reclamo, pérdidas, imputación de responsabilidades, daños y perjuicios, costos o gastos vinculados con la"
    +"Aplicación Móvil."
+ "\n\n"
    +"Los Usuarios reconocen y aceptan que los Terceros y sus empresas subsidiarias son terceros beneficiarios de estos Términos y Condiciones y que ellos tienen el derecho (y se asumirá"
    +"que han aceptado tal derecho) de ejercer estos Términos y Condiciones ante los usuarios como terceros beneficiarios."
+ "\n\n"
    +"La Aplicación Móvil fue creada para la versión más reciente disponible en el mercado de los sistemas operativos de los dispositivos móviles de los Usuarios y pueden surgir inconvenientes"
    +"de compatibilidad cuando se utilicen versiones anteriores. La cobertura de la red inalámbrica y la velocidad de la red de Wi-Fi varían según el proveedor y la ubicación geográfica."
    +"La Compañía no se responsabiliza por las limitaciones y/o fallas en el funcionamiento de ningún servicio inalámbrico o Wi-FI que se use para acceder a esta Aplicación Móvil ni por"
    +"la seguridad de los servicios inalámbricos o Wi-Fi. Asimismo, la Compañía no se responsabiliza de los cargos o tarifas por uso de redes de datos, que son exclusiva responsabilidad"
     +"del Usuario."
+ "\n\n"
    +"Actualizaciones de la aplicación móvil"
+ "\n\n"
    +"La Compañía puede solicitar a los Usuarios que actualicen su versión de la Aplicación Móvil en cualquier momento. Aunque se harán todos los esfuerzos por conservar las configuraciones"
    +"y preferencias personales de los Usuarios, seguirá existiendo la posibilidad de que las mismas se pierdan."
+ "\n\n"
    +"Problemas de cobertura inalámbrica y desactivación de funciones"
+ "\n\n"
    +"Al intentar realizar una transacción en la Aplicación Móvil, es posible que la conexión inalámbrica se interrumpa o que se desactive una función. En caso de que esto ocurriera,"
    +"los Usuarios deberán verificar el estado de la transacción que se haya intentado realizar apenas ingresen a un área con cobertura inalámbrica."
    +"Los Usuarios también pueden ponerse en contacto con un representante de servicio al cliente de MooD a través del enlace 'Sugerencias' dentro de la propia app."
+ "\n\n"
    +"Privacidad"
+ "\n\n"
    +"El uso de esta Aplicación Móvil implica la transmisión electrónica de información a través de las redes del proveedor de servicio inalámbrico. En vista de que la Compañía no opera ni"
    +"controla las redes inalámbricas utilizadas para acceder a la Aplicación Móvil, la Compañía no es responsable de la privacidad o seguridad de las transmisiones inalámbricas de datos."
    +"Los Usuarios deberán utilizar proveedores de servicios acreditados y verificar junto a su proveedor de servicios inalámbricos la información relativa a sus prácticas en materia de"
    +"privacidad y seguridad."
+ "\n\n"
    +"Est app garantiza que la información personal que usted envía cuenta con la seguridad necesaria. Los datos ingresados por usuario no serán entregados a terceros, salvo que deba"
    +"ser revelada en cumplimiento a una orden judicial o requerimientos legales."
+ "\n\n"
    +"Exclusión de garantía"
    +"LAS PARTES EXENTAS NO HACEN MANIFESTACIÓN ALGUNA EN CUANTO A LA FUNCIONALIDAD Y USO DEL CONTENIDO DE ESTA APLICACIÓN MÓVIL. EL USO Y NAVEGACIÓN QUE HAGA EL USUARIO CON ESTA APLICACIÓN"
    +"MÓVIL ES A RIESGO EXCLUSIVO DEL PROPIO USUARIO. TODA LA INFORMACIÓN CONTENIDA EN ESTA APLICACIÓN MÓVIL ES PROPORCIONADA 'TAL COMO ESTÁ' Y 'SEGÚN ESTÁ DISPONIBLE', SIN ASEVERACIONES"
    +"NI GARANTÍAS, YA SEAN EXPRESAS O TÁCITAS. LOS USUARIOS NO DEBEN ASUMIR QUE LA INFORMACIÓN INCLUIDA EN ESTA APLICACIÓN MÓVIL SE ACTUALIZA CONSTANTEMENTE NI QUE INCLUYE INFORMACIÓN"
    +"RECIENTE."
+ "\n\n"
    +"ESTA APLICACIÓN MÓVIL PODRÁ DEJAR DE FUNCIONAR, SER INTERRUMPIDA O FUNCIONAR INDEBIDAMENTE DE FORMA OCASIONAL. LAS PARTES EXENTAS NO TIENEN RESPONSABILIDAD POR DICHO CESE DE"
    +"FUNCIONAMIENTO, INTERRUPCIÓN O FUNCIONAMIENTO INDEBIDO. LOS USUARIOS QUEDAN ADVERTIDOS DE QUE LA INFORMACIÓN CONTENIDA AQUÍ PODRÍA CONTENER ERRORES TÉCNICOS, INEXACTITUDES, ERRORES"
    +"DE PROGRAMACIÓN, VIRUS DESCONOCIDOS Y OMISIONES. EL USUARIO ASUME TODOS LOS RIESGOS VINCULADOS CON EL USO DE ESTA APLICACIÓN MÓVIL, Y ACEPTA QUE LA COMPAÑÍA RENUNCIA A TODA GARANTÍA"
    +"VINCULADA AL USO DE LA APLICACIÓN MÓVIL POR PARTE DEL USUARIO."
+ "\n\n"
    +"SIN PERJUICIO DE LO DISPUESTO EN CUALQUIER OTRA CLÁUSULA DE ESTOS TÉRMINOS Y CONDICIONES, LA COMPAÑÍA RECHAZA TODA MANIFESTACIÓN O GARANTÍA, YA SEA EXPRESA O TÁCITA, DE TODO TIPO"
    +"EN REFERENCIA A ESTA APLICACIÓN MÓVIL (INCLUYENDO NUESTROS PRODUCTOS, SERVICIOS Y CONTENIDO DEL SITIO) INCLUIDAS, ENTRE OTRAS, LAS GARANTÍAS DE COMERCIABILIDAD Y APTITUD PARA UN"
    +"PROPÓSITO EN PARTICULAR, DE GOCE PACÍFICO, TÍTULO, NO VIOLACIÓN DE LOS DERECHOS DE TERCEROS Y PRECISIÓN. NINGUNA INFORMACIÓN O ASESORAMIENTO ORAL O ESCRITO DADO POR NOSOTROS O NUESTROS"
    +"REPRESENTANTES AUTORIZADOS CREARÁ UNA GARANTÍA NI AUMENTARÁ DE NINGUNA FORMA EL ALCANCE DE NUESTRAS OBLIGACIONES TAL CUAL SE ESTABLECEN EN ESTOS TÉRMINOS Y CONDICIONES."
+ "\n\n"
    +"Exoneración"
+ "\n\n"
    +"Los Usuarios liberarán de toda responsabilidad y exonerarán a las Partes Exentas de todo reclamo, demanda, responsabilidad civil, causa legal, querella o daños y perjuicios"
    +"(incluidos los honorarios y los gastos razonables de abogados) que surjan como consecuencia del uso que dichos Usuarios hagan de la Aplicación Móvil (incluidos nuestros productos,"
    +"servicios y Contenido), incluyendo, entre otros, la información, contenido o entrega incorrectos de la Aplicación Móvil, o de los productos y servicios de la Compañía o de terceros."
    +"La Compañía se reserva el derecho, por cuenta propia, de asumir la defensa y el control exclusivos de cualquier asunto sujeto a exoneración por parte de los Usuarios, pero el hacerlo"
     +"no exime a los Usuarios de sus obligaciones de exoneración."
+ "\n\n"
    +"Idioma prevaleciente"
+ "\n\n"
    +"En el caso de que existiera alguna inconsistencia, ambigüedad o conflicto entre la versión en inglés de estos Términos y Condiciones y las traducidas a otros idiomas, la versión en"
    +"castellano prevalecerá sobre el resto."
+ "\n\n"
    +"Preguntas y comentarios"
+ "\n\n"
    +"Los Usuarios que tengan alguna pregunta o duda sobre los Términos y Condiciones para Aplicaciones Móviles pueden ponerse en contacto en relación con esta Aplicación"
    +"Móvil escribiendo al siguiente correo electrónico:"
+ "\n\n"
    +"reponline@gmail.com";
  }

}
