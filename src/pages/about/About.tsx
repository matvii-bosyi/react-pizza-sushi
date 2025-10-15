import AboutImg1 from '@/assets/img/about-img-1.png'
import AboutImg2 from '@/assets/img/about-img-2.png'
import RestImg1 from '@/assets/img/rest-logo-1.png'
import RestImg2 from '@/assets/img/rest-logo-2.jpg'
import RestImg3 from '@/assets/img/rest-logo-3.jpg'
import RestImg4 from '@/assets/img/rest-logo-4.png'
import RestImg5 from '@/assets/img/rest-logo-5.png'

const About = () => {
	return (
		<div className='w-full bg-white mt-[20px] p-[30px] rounded-[28px] space-y-[30px] max-w-[1230px] mx-auto'>
			<h2 className='text-center'>Про нас</h2>
			<div className='flex gap-[20px]'>
				<img src={AboutImg1} alt='' className='w-[50%]' />
				<img src={AboutImg2} alt='' className='w-[50%]' />
			</div>
			<p>
				<b>SMAKI</b> - це сучасна сервіс-платформа, яка об’єднала найкращі
				пропозиції від лідируючих сайтів-доставки смачної піци, суші, сетів у
				Львові:
				<b> Smaki-maki, Sushi Go, Donatello Pizza, Moonfish та Oh My Pizza.</b> 
			</p>
			<div className='flex gap-[38px] justify-center max-h-[90px] h-[90px]'>
				<img
					src={RestImg1}
					alt=''
					className='object-center object-cover h-full rounded-[16px]'
				/>
				<img
					src={RestImg2}
					alt=''
					className='w-[156.4px] object-center object-cover h-full rounded-[16px]'
				/>
				<img
					src={RestImg3}
					alt=''
					className='w-[156.4px] object-center object-cover h-full rounded-[16px]'
				/>
				<img
					src={RestImg4}
					alt=''
					className='w-[156.4px] object-center object-cover h-full rounded-[16px]'
				/>
				<img
					src={RestImg5}
					alt=''
					className='w-[156.4px] object-center object-cover h-full rounded-[16px]'
				/>
			</div>
			<p>
				Обирай, що сьогодні смакує найкраще і роби це зручно, швидко, вигідно!
				Достойний вибір страв на всі вподобання та під будь-які події, вигідні
				акційні пропозиції, широка мережа закладів для самовивозу та приємні
				бонуси - відтепер все в одній платформі. 
			</p>
			<p>
				Ми впевнені, що саме безкомпромісна якість та свіжість інгредієнтів,
				майстерність та досвід наших кухарів - є запорукою бездоганного
				результату та ваших смачних вражень!
			</p>
			<div>
				<b className='leading-[30px]'>
					Любиш смачно поїсти, але не любиш готувати?
					<br />
					Домашній клопіт не залишив сил на приготування вечері?
					<br />
					Багато працюєш і бракує часу на ланч?
					<br />
					Чи ви просто плануєте приємну зустріч із друзями з улюбленими суші й
					піцею?
				</b>
				<p className='mt-[10px]'>
					Тоді ми точно знаємо, як задовольнити всі побажання. Обирай смачні
					роли, сети, піцу в будь-якого партнера платформи та замовляй!{' '}
				</p>
			</div>
			<h3 className='font-[700] text-[20px]'>
				Звісно ж, SMAKI пропонує цікаві акції та вигідні пропозиції:
			</h3>
			<div className='space-y-[5px]'>
				<ul className='leading-[27px] list-disc pl-[30px] font-[500]'>
					<li>
						Акція 2+1 на все піца-меню: Кожна третя піца - безкоштовно з
						понеділка по четвер
					</li>
					<li>
						Акція «3+1» діє в п’ятницю, суботу та неділю, а також у святкові
						дні.
					</li>
					<li>Замовляйте 4 піци, а платіть за 3!</li>
					<li>Подарунок на День народження</li>
					<li>Даруємо 10% знижки на замовлення із самовивозом</li>
				</ul>
				<p>
					*Повний перелік умов та актуальних пропозицій дивіться в обраного
					бренду-партнера
				</p>
			</div>
		</div>
	)
}

export default About
