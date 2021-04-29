<?php

namespace App\Controller;

use App\Entity\Theme;
use App\Entity\Website;
use App\Form\WebsiteType;
use App\Repository\WebsiteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/websites')]
class WebsiteController extends AbstractController
{
    #[Route('/', name: 'website_index', methods: ['GET'])]
    public function index(WebsiteRepository $websiteRepository): Response
    {
        return $this->render('website/index.html.twig', [
            'websites' => $websiteRepository->findAll(),
        ]);
    }

    #[Route('/new/{slug}', name: 'website_new', methods: ['GET', 'POST'])]
    public function new(Request $request, Theme $theme): Response
    {
        $this->denyAccessUnlessGranted('THEME_CREATE_CONTENT', $theme);
        
        $website = new Website();
        $website->setTheme($theme);
        
        $form = $this->createForm(WebsiteType::class, $website);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($website);
            $entityManager->flush();
            $this->addFlash('success', "Website saved !");

            return $this->redirectToRoute('website_index');
        }

        return $this->render('website/new.html.twig', [
            'website' => $website,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'website_show', methods: ['GET'])]
    public function show(Website $website): Response
    {
        return $this->render('website/show.html.twig', [
            'website' => $website,
        ]);
    }

    #[Route('/{id}/edit', name: 'website_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Website $website): Response
    {
        $form = $this->createForm(WebsiteType::class, $website);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();
            $this->addFlash('success', "Website updated !");

            return $this->redirectToRoute('website_index');
        }

        return $this->render('website/edit.html.twig', [
            'website' => $website,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'website_delete', methods: ['POST'])]
    public function delete(Request $request, Website $website): Response
    {
        if ($this->isCsrfTokenValid('delete'.$website->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($website);
            $entityManager->flush();
            $this->addFlash('success', "Website deleted !");
        }

        return $this->redirectToRoute('website_index');
    }
}
