<?php

namespace App\Controller;

use App\Entity\Theme;
use App\Form\ThemeType;
use App\Service\FollowInteractionService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/topics')]
class ThemeController extends AbstractController
{
    #[Route('/', name: 'topic_index', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('topic/index.html.twig', [
            'menu' => 'explore',
        ]);
    }

    #[Route('/new', name: 'topic_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $theme = new Theme();
        $form = $this->createForm(ThemeType::class, $theme);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($theme);
            $entityManager->flush();
            $this->addFlash('success', "Sujet créé");

            return $this->redirectToRoute('topic_show', ['slug' => $theme->getSlug()]);
        }

        return $this->render('topic/new.html.twig', [
            'theme' => $theme,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{slug}', name: 'topic_show', methods: ['GET'])]
    public function show(Theme $theme): Response
    {
        $this->denyAccessUnlessGranted('TOPIC_READ', $theme);

        return $this->render('topic/show.html.twig', [
            'theme' => $theme,
        ]);
    }

    #[Route('/{slug}/follow', name: 'topic_follow', methods: ['GET'])]
    public function follow(Theme $theme, FollowInteractionService $followInteraction): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $this->denyAccessUnlessGranted('TOPIC_READ', $theme);

        if ($this->getUser() !== $theme->getOwner()) {
            $followInteraction->follow($theme);
        }
        
        return $this->redirectToRoute('topic_show', ['slug' => $theme->getSlug()]);
    }   

    #[Route('/{slug}/add', name: 'topic_additem', methods: ['GET'])]
    public function addItem(Theme $theme): Response
    {
        return $this->redirectToRoute('website_new', ['slug' => $theme->getSlug()]);
    }

    #[Route('/{id}/edit', name: 'topic_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Theme $theme): Response
    {
        $this->denyAccessUnlessGranted('TOPIC_EDIT', $theme);

        $form = $this->createForm(ThemeType::class, $theme);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();
            $this->addFlash('success', "Sujet mis à jour");

            return $this->redirectToRoute('topic_show', ['slug' => $theme->getSlug()]);
        }

        return $this->render('topic/edit.html.twig', [
            'theme' => $theme,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'topic_delete', methods: ['POST'])]
    public function delete(Request $request, Theme $theme): Response
    {
        $this->denyAccessUnlessGranted('TOPIC_DELETE', $theme);

        if ($this->isCsrfTokenValid('delete'.$theme->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($theme);
            $entityManager->flush();
            $this->addFlash('success', "Sujet supprimé");
        }

        return $this->redirectToRoute('topic_index');
    }
}
