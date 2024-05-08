<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Seeder class inserting the initial data of the table projects
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'project_name' => 'Joan Grill',
                'definition' => 'Joan Grill neix de l’il·lusió d’elaborar un vi ecològic d’alçada que transmeti l’essència de la Zona +500. A Cal Joan Grill fem una viticultura ecològica, respectant l’entorn, els recursos naturals i la biodiversitat de la Zona +500. Per elaborar els nostres vins, hem seleccionat els millors raïms de vinyes velles, els hem collit a mà, els hem transportat fins al celler amb caixes petites perquè arribin en el millor estat, els hem macerat amb les pells abans de premsar-los per extreu-re’n tots els seus aromes, i els hem premsat suaument per obtenir-ne la màxima qualitat. Tot el procés d’elaboració del vi ha estat cuidat al màxim detall, amb una criança de 6 mesos en contacte amb les lies, per enriquir el vi amb més complexitat aromàtica, més estructura, més aromes i més poder d\'envelliment del vi, i finalment hem embotellat 2 vins blancs, el Tiet i el Jornal.',
                'description' => 'Família de Viticultors que elabora vins ecològics d’alçada de la Zona +500',
                'stories' => 'Cal Joan Grill es va fundar el 1931 i sempre hem estat una família de pagesos que hem fet de masovers a la finca de Cal Cendra, una barriada del Pla de Manlleu. L’any 1979 hi va haver mala collita i els cellers del Penedès pagaven per sota del cost de producció, i a Cal Joan Grill van decidir arriscar-se i vinificar-ho tot ells mateixos. Els resultats no van ser els esperats, perquè a partir de llavors ja no van fer més vi. El 2006 es va reprendre l’elaboració de vi, amb el Xavier Pons, el fill gran de Cal Joan Grill i recient llicenciat en Enologia, i l’ajuda del seu germà, el Sergi Pons, que sempre havia volgut vinificar el raïm que sempre havia vist produir a casa. El 2023 es va presentar l’oportunitat d’elaborar els nostres vins al Viver de Cellers de Vilafranca del Penedès, i poder-los comercialitzar.',
                'logo_path' => 'assets/img/projects/joan-grill.png',
            ],
            [
                'project_name' => 'Vins Gèniu',
                'definition' => '@geniu_vins és el projecte familiar apassionant d’elaboració de vins ecològics de vinyes velles que connecta les darreres cinc generacions de la família Urpí.',
                'description' => 'Elaboració de vins ecològics de vinyes velles',
                'stories' => 'Al marge alt d\'una riera del Riu Foix, al cor del Penedès, l’Eugeni Urpí i la Feliça Cassanyes van plantar, el 1957, unes centenes de ceps autòctons. Cinc generacions després, i encara cuidant aquestes vinyes velles, el seu net Josep i les seves filles Imma i Fina han començat un petit apassionant projecte d’elaboració de vins i han volgut retre homenatge al besavi amb el nom amb el que l’anomenaven al poble, a Les Masuques: ‘GÈNIU’. La producció és ecològica i es cull a mà, gaudint de cada detall tant en el procés de viticultura com en l’elaboració, amb l’ànim de fer extensiu que cada ampolla sigui també un convit a gaudir. Actualment hem trobat al Viver de Cellers del Penedès l\'espai per crear, experimentar, aprendre i compartir. És aquí on recentment hem elaborat el nostre Brisat de xarel·lo ecològic de mínima intervenció, una edició limitada de 747 ampolles amb el segell de la DO Penedès i amb el què brindem i celebrem la terra en tota la seva essència, sense interferències. El 1957 el ‘Gèniu\' i la Feliça van plantar una hectàrea de ceps de la varietat autòctona penedesenca xarel·lo. El 1964 el seu fill Josep amb la seva dona Contxita en van plantar dues d’ull de llebre. I ara fa uns anys, el seu fill Josep, juntament amb les seves filles i néts, hem decidit plantar, també, garnatxa negra. El 2021 vam embotellar la primera producció pròpia de blanc xarel·lo i negre ull de llebre amb garnatxa negra. Aquest any 2023 vam trobar al Viver de Cellers Penedès l’espai on poder elaborar els nostres propis. D’aquí ha sortit el nostre primer vi natural, un brisat de xarel·lo D.O. Penedès d’edició limitada; els negres, fent la seva criança dins fusta de roure. Les nostres produccions són limitades i petites, collim i seleccionem a mà, i tota la producció és ecològica.',
                'logo_path' => 'assets/img/projects/vins-geniu.png',
            ],
            [
                'project_name' => 'Mulet Viticultors',
                'definition' => 'Mulet Viticultors som un microceller familiar situat als afores de Vilafranca del Penedès i al bell mig del Penedès, que neix amb la voluntat de dignificar la nostra feina com a viticultors, posar-la en valor i fer de la vinya la protagonista dels nostres vins. SOM PAGESOS Fem viticultura ecològica certificada. Treballem 18 hectàrees de vinya i també 200 oliveres i microelaborem una part de la nostra producció de raïm per fer-ne els nostres propis vins i escumosos. Som viticultors i microelaboradors, ens encanta la nostra feina i volem viure d’ella. LA TISORETA El nostre distintiu, la tisoreta, representa la nostra filosofia i els nostres valors com el respecte per la terra, la natura i l’entorn, mitjançant una agricultura ecològica i pràctiques biodinàmiques. Creiem molt fermament en un model circular compromès amb el territori, el seu patrimoni i la seva gent. VISIÓ Volem un Penedès on es preservi la cultura del vi i el paisatge del nostre territori, on la vinya sigui molt més que un tros de terra conreada i un canvi que esperem veure sobre una problemàtica històrica és la de veure preus justos pel raïm i pel vi, on els beneficis es reparteixin realment entre tota la cadena alimentària i especialment per a la pagesia i els viticultors. Per poder tenir productes i vins de proximitat, hem d’autoproveïr-nos i necessitem gent jove per liderar el sector agrari.',
                'description' => '@muletviticultors som pagesos, viticultors i microelaboradors de vins i escumosos.',
                'stories' => 'A Mulet Viticultors fa més de 30 anys i dues generacions que fem de pagesos i viticultors a la comarca del Penedès. Portem 18 hectàrees de vinya i 200 oliveres amb parcel·les dins els municipis de Vilafranca, les Cabanyes i Olèrdola; totes certificades ecològiques des de fa 16 anys. Fins l’anyada 2014 venem el raïm a terceres bodegues, però és llavors quan comence a fer les nostres primeres vinificacions a la masia on fem de masovers, la Torreta dels Bous. Al 2018 s’incorpora oficialment la segona generació familiar i canviem la imatge dels nostres vins, els professionalitzem i comencem a comercialitzar-los a petita escala. Som inquiets i compaginem l’activitat agrària amb formacions i cursos, com el cicle d’enologia d’Espiells o per exemple formacions en agricultura biodinàmica i regenerativa, entre d’altres. Al 2023 comencem a fer els nostres vins i escumosos al nou viver de cellers del Penedès. És un canvi que ens obre l’oportunitat d’ampliar la nostra producció a 4.000 ampolles amb els nostre propis registres i amb maquinària i instal·lacions compartides totalment professionals. Esperem així poder consolidar-nos com a viticultors i com a elaboradors.',
                'logo_path' => 'assets/img/projects/mulet-viticultors.png',
            ],

            [
                'project_name' => 'Vins de Sinergia',
                'definition' => 'Breu descripció o informació addicional sobre el celler.',
                'description' => 'Elaboració de vins',
                'stories' => 'Història del celler',
                'logo_path' => 'assets/img/projects/vins-de-sinergia.png',
            ],
            [
                'project_name' => 'Heretat Can Serra',
                'definition' => 'Breu descripció o informació addicional sobre el celler.',
                'description' => 'Elaboració de vins',
                'stories' => 'Història del celler',
                'logo_path' => 'assets/img/projects/heretat-can-serra.png',
            ],
            [
                'project_name' => 'Heretat Baltà de Cela',
                'definition' => 'Breu descripció o informació addicional sobre el celler.',
                'description' => 'Elaboració de vins',
                'stories' => 'Història del celler',
                'logo_path' => 'assets/img/projects/heretat-balta-de-cela.png',
            ],
            [
                'project_name' => 'Amat i Montané',
                'definition' => 'Breu descripció o informació addicional sobre el celler.',
                'description' => 'Elaboració de vins',
                'stories' => 'Història del celler',
                'logo_path' => 'assets/img/projects/amat-i-montane.png',
            ],
        ];

        DB::table('projects')->insert($data);
    }
}
