<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class EditPasswordType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('currentPassword', PasswordType::class, [
                'constraints' => [
                    new UserPassword()
                ],
                'label' => 'Votre mot de passe actuel',
                'attr' => [
                    'autocomplete' => 'off',
                    'class' => 'input input-text'
                ]
            ])
            ->add('newPassword', RepeatedType::class, [
                'type' => PasswordType::class, 
                'constraints' => [
                    new NotBlank(),
                    new Length(['min' => 8])
                ],
                'required' => true,
                'first_options' => [
                    'label' => 'Nouveau mot de passe',
                    'attr' => ['class' => 'input input-password'],
                    'help' => 'Le mot de passe doit faire au moins 8 caractères.',
                ],
                'second_options' => [
                    'label' => 'Confirmer le nouveau mot de passe',
                    'attr' => ['class' => 'input input-password']
                ],
                'invalid_message' => 'Les champs ne correspondent pas'
            ]);
    }
}