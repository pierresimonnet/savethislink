<?php

namespace App\Form;

use App\Entity\Theme;
use App\Entity\Website;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Security;

class WebsiteType extends AbstractType
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('theme', EntityType::class, [
                'attr' => ['class' => 'input input-select'], 
                'label' => 'Choose a theme',
                'required' => true,
                'class' => Theme::class,
                'query_builder' => function(EntityRepository $er) {
                    return $er->createQueryBuilder('theme')->andWhere('theme.owner = :user')->setParameter('user', $this->security->getUser());
                },
                'choice_label' => 'title'
            ])
            ->add('url', UrlType::class, [
                'attr' => ['class' => 'input input-text'], 
                'label' => 'The URL of the website',
                'required' => true
            ])
            ->add('comment', TextareaType::class, [
                'attr' => ['class' => 'input input-textarea'], 
                'label' => 'Your comment',
                'required' => true
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Website::class,
        ]);
    }
}
