import {ChevronRightIcon} from 'lucide-react'
import Image from 'next/image'
import GoogleMap from '~/features/google-map/ui/google-map'
import {AspectRatio} from '~/shared/ui/components/aspect-ratio'
import Container from '~/shared/ui/components/container'
import {Separator} from '~/shared/ui/components/separator'
import {Typography} from '~/shared/ui/components/typography'

export default function AboutPage() {
	return (
		<Container className='space-y-10 pt-5 pb-20 sm:pt-10 lg:space-y-20'>
			<section className='flex flex-col gap-x-5 gap-y-20 lg:gap-x-10'>
				<AspectRatio
					ratio={16 / 9}
					className='relative grid flex-1 place-content-center text-center'>
					<Typography variant='h1' className='z-10 mb-5 text-white/90'>
						Chleba, lakocinki a káva
					</Typography>
					<Typography variant='span' className='z-10 text-white/90'>
						Tri základné piliére remeselnej pekárne Kromka.
					</Typography>
					<Image
						src={'/kromka_bunner_bg_b2b.webp'}
						alt='Kromka'
						fill
						className='absolute inset-0 z-0 size-full rounded-md object-cover object-center brightness-90'
					/>
				</AspectRatio>

				<div className='flex flex-col gap-5 lg:gap-10'>
					<Typography variant='h2' className='col-span-2 text-center'>
						Láska ku kvásku
					</Typography>
					<div className='flex flex-col gap-5 lg:flex-row lg:gap-10'>
						<div className='flex flex-1 items-center justify-center'>
							<AspectRatio ratio={16 / 9} className='rounded-md bg-muted'>
								<Image
									src={'/kromka_bunner_bg_b2b.webp'}
									alt='Kromka'
									fill
									className='size-full rounded-md object-cover object-center brightness-90'
								/>
							</AspectRatio>
						</div>

						<div className='flex-1'>
							<Typography variant='p'>
								práve to bol dôvod, prečo sme v roku 2020 otvorili našu prvú
								pobočku na ulici 17. novembra v Prešove. Je tam dodnes, a naši
								zákazníci k nám pravidelne chodia po svoj kváskový bochník,
								čerstvé rožky, koláče, pečené buchty.
							</Typography>
							<Typography variant='p'>
								Pečieme každý deň a naše pečivo už ochutnáte aj v ďalších
								podnikoch, u susedov v Nico caffé či v talianskom bistre Ciao,
								ale aj v rôznych iných podnikoch nielen v Prešove. Svoje pobočky
								sme otvorili aj v Košiciach, a najnovšie vám v nich urobíme aj
								kávu.
							</Typography>
						</div>
					</div>
				</div>

				<div className='flex flex-col gap-5 lg:gap-10'>
					<Typography variant='h2' className='flex-1 text-center'>
						Kde nás nájdete?
					</Typography>
					<div className='flex flex-col gap-5 lg:flex-row lg:gap-10'>
						<div className='flex flex-1 flex-col items-start justify-start gap-y-4'>
							<Typography variant='h4'>Prešov</Typography>
							<ul className='space-y-2'>
								<li className='flex items-center justify-start'>
									<ChevronRightIcon className='mr-2 h-4 w-4' />
									<Typography variant='span'>ul. 17. novembra 104</Typography>
								</li>
								<li className='flex items-center justify-start'>
									<ChevronRightIcon className='mr-2 h-4 w-4' />
									<Typography variant='span'>
										Kromka Galéria na Hlavnej 53
									</Typography>
								</li>
							</ul>

							<Typography variant='h4' className='mt-5'>
								Košice
							</Typography>
							<ul className='space-y-2'>
								<li className='flex items-center justify-start'>
									<ChevronRightIcon className='mr-2 h-4 w-4' />
									<Typography variant='span'>
										Kuzmányho 1, vedľa kaviarne Nico
									</Typography>
								</li>
								<li className='flex items-center justify-start'>
									<ChevronRightIcon className='mr-2 h-4 w-4' />
									<Typography variant='span'>
										Masarykova 6, aj s malou terasou v tieni stromov
									</Typography>
								</li>
							</ul>
						</div>

						<div className='flex-1'>
							<GoogleMap />
						</div>
					</div>
				</div>

				<Separator />

				<div className='flex flex-col gap-5 lg:flex-row lg:gap-10'>
					<div className='flex flex-1 items-center justify-center'>
						<AspectRatio
							ratio={16 / 9}
							className='flex-grow rounded-md bg-muted'>
							<Image
								src={'/kromka_bunner_bg_b2b.webp'}
								alt='Kromka'
								fill
								className='size-full rounded-md object-cover object-center brightness-90'
							/>
						</AspectRatio>
					</div>

					<div className='flex-1'>
						<Typography variant='p'>
							Stále vymýšľame niečo nové, z našich žemlí si pripravíte ten
							najlepší burger, a okrem pečiva u nás nájdete aj výber rôznych
							lakociniek z lokálnych zdrojov. Ponúkneme poctivé párky, smotanové
							maslo, tvaroh, flex-1šťastné vajíčka, remeselné pivko či naturálne
							víno? Zastavte sa u nás v Kromke.
						</Typography>
					</div>
				</div>
			</section>
		</Container>
	)
}
