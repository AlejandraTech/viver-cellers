<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'definition' => 'Breu descripció o informació addicional sobre el celler.',
                'description' => 'Elaboració de vins',
                'stories' => 'Història del celler',
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
